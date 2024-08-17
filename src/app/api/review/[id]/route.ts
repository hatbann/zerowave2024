/** @format */

import Review from '@/models/review';
import dbConnect from '@/utils/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const review = await Review.findOne({
      _id: params.id,
    });

    review.views += 1;
    await review.save();
    return new NextResponse(JSON.stringify(review), { status: 200 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return Response.error();
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const review = await Review.findOne({
      _id: params.id,
    });
    const data = await req.json();
    review.title = data.title;
    review.content = data.content;
    await review.save();
    return new NextResponse(JSON.stringify(review), { status: 200 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return Response.error();
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const res = await Review.deleteOne({
      _id: params.id,
    });
    return new NextResponse(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return Response.error();
  }
}
