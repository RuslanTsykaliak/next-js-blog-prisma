import prisma from "@/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const blogID = url.searchParams.get("blogID");

    /////
    // if (!blogID || isNaN(Number(blogID))) {
    //   return NextResponse.json({
    //     success: false,
    //     message: "Invalid blogID provided",
    //   });
    // }

    const blogDetails = await prisma.post.findUnique({
      where: {
        id: Number(blogID),
      },
    });

    if (blogDetails) {
      return NextResponse.json({
        success: true,
        data: blogDetails,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch the blog details ! Please try again",
      });
    }
  } finally {

  }
  /// Give an error in building by not showing content of posts and providing undefined error.
  
  // catch (e) {
  //   console.log(e);

  //   return NextResponse.json({
  //     success: false,
  //     message: "Something went wrong ! Please try again",
  //   });
  // }
}
