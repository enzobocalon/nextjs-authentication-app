import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes('@') || !email.match(emailRegex) ||
    !password ||
    password.trim().length < 7) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const userAlreadyExists = await db.collection('users').findOne({email: email});

  if (userAlreadyExists) {
    res.status(422).json({
      message: 'User already exists'
    });
    client.close();
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
    name: 'undefined',
    bio: 'undefined',
    phone: 'undefined',
    avatar_url: 'undefined'
  });

  if (result) {
    res.status(201).json({
      message: 'User created!'
    });

    client.close();
  }
}
