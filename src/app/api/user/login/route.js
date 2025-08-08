import User from "@/models/user.model";
import { NextResponse } from "next/server";
import dbconnect from "@/db/dbconnect";
import { cookies } from "next/headers";
await dbconnect();
export async function POST(request) {
  const cookiestore = await cookies();
  const { email, password } = await request.json();
  const existinguser = await User.findOne({ email });
  if (!existinguser) {
    return NextResponse.json({ message: "User not found" });
  }
  const bcryptres = await existinguser.isPasswordCorrect(password);
  const refreshtoken = await existinguser.generaterefreshtoken();
  existinguser.refreshtoken = refreshtoken;
  await existinguser.save();
  const options = {
    httpOnly: true,
    secure: true,
  };
  const accesstoken = await existinguser.generateaccesstoken();
  if (!bcryptres) return NextResponse.json({ message: "incorrect password" });
  cookiestore.set("accesstoken", accesstoken, options);
  cookiestore.set("refreshtoken", refreshtoken, options);
  
  return NextResponse.json({ existinguser });
}
