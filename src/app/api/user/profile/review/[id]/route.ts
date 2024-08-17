import Review from '@/models/review';
import dbConnect from '@/utils/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const review = await Review.find({
      author: params.id,
    });

    return new NextResponse(
      JSON.stringify({
        message: 'Ok',
        data: review,
      }),
      { status: 200 }
    );
    /*    if (req.nextUrl && req.nextUrl.searchParams.get('id')) {
      const id = req.nextUrl.searchParams.get('id');
      const review = await Review.find({
        author: id,
      });

      return new NextResponse(
        JSON.stringify({
          message: 'Ok',
          data: review,
        }),
        { status: 200 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: 'NO DATA',
      }),
      { status: 200 }
    ); */
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return Response.error();
  }
}
