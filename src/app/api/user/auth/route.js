import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(request){
    const cookiestore=await cookies();
    const accesstoken=cookiestore.get("accesstoken")?.value
    if(!accesstoken) return NextResponse.json({ auth:false });
    return NextResponse.json({ auth:true });
}