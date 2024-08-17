/** @format */

import Review from '@/models/review';
import dbConnect from '@/utils/database';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const newPost = new Review(body);

  try {
    await dbConnect();
    console.log(newPost);
    await newPost.save();

    return new NextResponse('post has been created', { status: 200 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return Response.error();
  }
}

export async function GET() {
  try {
    await dbConnect();
    const lists = await Review.find().sort({ created_at: -1 });

    return new NextResponse(JSON.stringify(lists), { status: 200 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return Response.error();
  }
}
