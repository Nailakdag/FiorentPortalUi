import { GET_VEHICLE_INFORMATION_BY_EQUIPMENT_SERIAL_NUMBER } from "@/contants/fiorentPortalApi";
import { authOptions } from "@/lib/auth";
import { fetchFromFiorentApi } from "@/lib/fiorentPortalApi";
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
    const equipmentSerialNumberId = searchParams.get("equipmentSerialNumberId");

    const queryParams = setSearchParams({ equipmentSerialNumberId });
    const { data, error } = await fetchFromFiorentApi(
      `${GET_VEHICLE_INFORMATION_BY_EQUIPMENT_SERIAL_NUMBER}?${queryParams}`,
    );
    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
