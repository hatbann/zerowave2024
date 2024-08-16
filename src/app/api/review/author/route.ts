import User from '@/models/user';
import dbConnect from '@/utils/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    /*  */

    if (req.nextUrl && req.nextUrl.searchParams.get('id')) {
      const id = req.nextUrl.searchParams.get('id');
      const author = await User.findOne({
        _id: id,
      });

      console.log(author);
      return new NextResponse(
        JSON.stringify({
          message: 'OK',
          data: {
            id: author._id,
            nickname: author.nickname,
          },
        }),
        { status: 200 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: 'NO AUTHOR',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return Response.error();
  }
}
