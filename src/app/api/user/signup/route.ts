/** @format */

import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';
import dbConnect from '@/utils/database';
const bcrypt = require('bcryptjs');
const saltRounds = 10;
export async function POST(req: NextRequest) {
  const { email, password, nickname } = await req.json();

  try {
    await dbConnect();
    const checkExisting = await User.findOne({ email });

    if (checkExisting) {
      return new NextResponse(
        JSON.stringify({
          type: 'already',
        }),
        { status: 200 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        email,
        password: hashedPassword,
        nickname,
      });
      await newUser.save();
      return new NextResponse(
        JSON.stringify({
          type: 'success',
        }),
        { status: 200 }
      );
    }
  } catch (error) {}
}
