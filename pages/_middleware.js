import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){
    
    //token exists if user logs in
    const token = await getToken({req, secret: process.env.JWT_SECRET})

    const {pathname} = req.nextUrl

    //requests allowed

    // if its a request for the next-auth session and provider fetcheing
    // or  token exists
    if(pathname.includes('/api/auth') || token){
        return NextResponse.next()
    }

    //redirect them to login if they do not have token and are requesting a protected route

    if(!token && pathname !== "/login"){
        return NextResponse.rewrite(new URL('/login', req.url))
    }


}