/** @format */

import dbConnect from "@/utils/database";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    // Extract user ID from the authentication token
    const userId = await getDataFromToken(request);

    // Find the user in the database based on the user ID
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
