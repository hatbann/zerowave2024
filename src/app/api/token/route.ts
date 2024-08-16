import User from '@/models/user';
import dbConnect from '@/utils/database';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.TOKEN_SECRET!;
const jwt = require('jsonwebtoken');
/* 
const verify = (token: string) => {
  let decoded: any = null;
  try {
    decoded = jwt.verify(token, secret);
    return {
      ok: true,
      userId: decoded.id,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    let token = req.cookies.get('token')?.value;
    if (token) {
      const user = await User.findOne({ token });
      if (user) {
        const payload = {
          // json web token 으로 변환할 데이터 정보
          user: {
            id: user.id,
          },
        };
        const accessToken = await jwt.sign(payload, process.env.TOKEN_SECRET!, {
          expiresIn: '1d',
        });
        user.token = token;
        await user.save();
        const body = {
          message: 'OK',
          token: {
            accessToken: accessToken,
          },
          user,
        };

        const response = NextResponse.json(body);

        // Set the token as an HTTP-only cookie
        response.cookies.set('token', accessToken, {
          httpOnly: true,
        });

        return response;
      } else {
        const body = {
          message: 'Failed',
          token: {
            accessToken: '',
          },
        };
        const response = NextResponse.json(body);
        return response;
      }
    } else {
      const body = {
        message: 'Failed',
        token: {
          accessToken: '',
        },
      };
      const response = NextResponse.json(body);
      return response;
    }
  } catch (error) {
    throw error;
  }
}
 */

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const token = req.cookies.get('token')?.value || '';
    if (token) {
      const decodedToken: any = jwt.verify(token, secret);
      const userId = decodedToken.user.id;
      console.log(decodedToken);
      const user = await User.findOne({ _id: userId });
      if (user) {
        const payload = {
          // json web token 으로 변환할 데이터 정보
          user: {
            _id: user.id,
            nickname: user.nickname,
          },
        };
        /*         const accessToken = await jwt.sign(payload, process.env.TOKEN_SECRET!, {
          expiresIn: '1d',
        });
        user.token = token;
        await user.save(); */
        const body = {
          message: 'OK',
          user,
        };

        const response = NextResponse.json(body);

        // Set the token as an HTTP-only cookie
        /*        response.cookies.set('token', accessToken, {
          httpOnly: true,
        });
 */
        return response;
      } else {
        const body = {
          message: 'Failed',
        };
        const response = NextResponse.json(body);
        return response;
      }
    } else {
      const body = {
        message: 'Failed',
        user: {},
      };
      const response = NextResponse.json(body);
      return response;
    }
  } catch (error) {
    throw error;
  }
}
