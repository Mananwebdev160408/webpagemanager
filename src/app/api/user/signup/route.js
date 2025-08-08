import dbconnect from "@/db/dbconnect";
import User from "@/models/user.model.js";
import { NextResponse } from "next/server";
await dbconnect();
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    console.log(name, email, password);
    const existinguser = await User.findOne({ email });
    console.log(existinguser);
    if (existinguser)
      return NextResponse.json({ message: "User already exists" });
    const user = await User.create({ name, email, password });
    console.log(user);
    
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
