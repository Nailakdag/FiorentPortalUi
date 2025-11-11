import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { fetchFromFiorentApi } from "@/lib/fiorentPortalApi";
import { GET_EQUIPMENT_FOR_TABLE_DROPDOWN } from "@/contants/fiorentPortalApi";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { data, error } = await fetchFromFiorentApi(
      `${GET_EQUIPMENT_FOR_TABLE_DROPDOWN}?${request.nextUrl.searchParams}`,
    );

    return new Response(JSON.stringify(data?.items));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
