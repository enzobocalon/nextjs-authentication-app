import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import nextConnect from 'next-connect';
import { connectToDatabase } from '../../../lib/db';
import { ObjectId } from 'mongodb';
import { hashPassword } from '../../../lib/auth';

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

let filename = `${new Date().getTime()}`;

const getFileName = (file: string) => {
  filename += file;
  return filename;
};

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/profiles',
    filename: (req, file, cb) => cb(null, getFileName(file.originalname)),
  })
});

apiRoute.use(upload.array('image'));

apiRoute.post(async (req, res) => {
  const { id, name, phone, bio, password, avatar_url } = JSON.parse(req.body.user);
  const client = await connectToDatabase();

  if (!id) {
    res.status(401).json({message: 'Unauthorized'});
  }

  const db = client.db();
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({
    _id: new ObjectId(id)
  });

  if (!user) {
    res.status(400).json({message: 'User not found'});
    client.close();
    return;
  }

  const updatedUser = {
    $set: {
      name: name ? name : user.name,
      bio: bio ? bio : user.bio,
      phone: phone ? phone : user.phone,
      avatar_url:  avatar_url ? filename : user.avatar_url ,
      password: password ? await hashPassword(password) : user.password
    }
  };

  if (updatedUser) {
    await db.collection('users').findOneAndUpdate({
      _id: new ObjectId(id)
    }, updatedUser);
  }

  res.status(200).json({ message: 'ok' }); // response
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
