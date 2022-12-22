import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';
import { ObjectId } from 'mongodb';
import { hashPassword } from '../../../lib/auth';

export default async function handler(req: NextApiRequest , res: NextApiResponse) {
  const {id, name, phone, password, bio, email} = req.body;

  if (!id || !email) {
    res.status(400).json({message: 'User not found'});
  }

  const client = await connectToDatabase();
  const db = client.db();

  if (!db) {
    res.status(500).json({message: 'User not found'});
  }

  const userCollection = db.collection('users');
  const profileCollection = db.collection('profile');

  const user = await userCollection.findOne({
    _id: new ObjectId(id)
  });

  const profile = await profileCollection.findOne({
    email: email
  });

  if (user && !profile) {
    await profileCollection.insertOne({
      name,
      userId: id,
      phone,
      bio,
      password: null,
      email,
      type: 'provider'
    });
  }

  const updatedUser = {
    $set: {
      name: profile?.name || profile?.name !== 'undefined' ? name ? name : profile?.name : user?.name,
      bio: bio ? bio : profile?.bio,
      phone: phone ? phone : profile?.phone,
      password: profile?.type !== 'provider' ? password ? hashPassword(password) : profile?.password : 'undefined'
    }
  };

  await profileCollection.findOneAndUpdate({email: email}, updatedUser);

  res.status(200).json({ message: 'ok' });
}
