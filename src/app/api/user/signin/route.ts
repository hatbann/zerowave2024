/** @format */

import { signIn } from "next-auth/react";
/** @format */

import { UserType } from "@/models/user";
import dbConnect from "@/utils/database";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data: UserType = await req.json();
    const password: String = data.password;
    const user: UserType = await User.findOne({ email: data.email }).exec();

    if (user == null) {
      return new NextResponse(
        JSON.stringify({ message: "계정이 존재하지 않습니다", result: "" })
      );
    }

    const isMatched: boolean = await bcrypt.compare(password, user.password);

    const payload = {
      // json web token 으로 변환할 데이터 정보
      user: {
        id: user.id,
      },
    };
    // json web token 생성하여 send 해주기

    const token = await jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    /*   user.token = token; */
    await user.save();
    const body = {
      message: isMatched ? "OK" : "아이디 혹은 비밀번호를 확인해주세요.",
      /*       token: {
        accessToken: isMatched && token,
      }, */
      user,
    };
    const response = NextResponse.json(body);

    // Set the token as an HTTP-only cookie
    // cookie 값 client 접근 불가능
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return Response.error();
  }
}
