import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLogin(request: NextRequest) {
  const cookie = request.cookies.has("next-auth.session-token");
  return cookie;
}