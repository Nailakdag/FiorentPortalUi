import { DOWNLOAD_FILE } from "@/contants/fiorentPortalApi";
import { authOptions } from "@/lib/auth";
import { getToFilesFiorentApi } from "@/lib/fiorentPortalApi";
import { setSearchParams } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const fileName = searchParams.get("fileName");
    const originalFileName = searchParams.get("originalFileName");
    const filePath = searchParams.get("filePath");

    const queryParams = setSearchParams({
      fileName,
      originalFileName,
      filePath,
    });

    const data = await getToFilesFiorentApi(`${DOWNLOAD_FILE}?${queryParams}`);

    return data;
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
