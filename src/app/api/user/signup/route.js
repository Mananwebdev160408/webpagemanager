import dbconnect from "@/db/dbconnect";
import User from "@/models/user.model.js";
import { NextResponse } from "next/server";
await dbconnect();
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    const existinguser = await User.findOne({ email });
    if (existinguser)
      return NextResponse.json({ message: "User already exists" });
    const user = await User.create({ name, email, password });
    
    if (!user) {
      return NextResponse.json({ message: "User not created" });
    }
    return NextResponse.json(
      { message: "User created successfully" },
      { user },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
