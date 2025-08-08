import dbconnect from "@/db/dbconnect";
import User from "@/models/user.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
await dbconnect();

export async function GET(request) {
    const cookiestore=await cookies();
    const accesstoken=cookiestore.get("accesstoken").value
    const decodedtoken=jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRET)
    if(!decodedtoken) return NextResponse.json({ message: "User not logged in" });
    const mongores=await User.findByIdAndUpdate(decodedtoken._id,{
        $unset:{accesstoken:1,refreshtoken:1}
    })
    if(!mongores) return NextResponse.json({ message: "User not logged in" });
    cookiestore.delete("accesstoken");
    cookiestore.delete("refreshtoken");
    return NextResponse.json({ message: "User logged out successfully" });
}