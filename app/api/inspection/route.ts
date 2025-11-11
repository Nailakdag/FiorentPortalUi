import { GET_INSPECTION_GET_ALL } from "@/contants/fiorentPortalApi";
import { authOptions } from "@/lib/auth";
import { fetchFromFiorentApi } from "@/lib/fiorentPortalApi";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { data, error } = await fetchFromFiorentApi(
      `${GET_INSPECTION_GET_ALL}?${request.nextUrl.searchParams.toString()}`,
    );

    let responseData = [];

    if (!error) {
      responseData = data?.items.map((inspection: any) => ({
        ...inspection,
        ...inspection?.inspection,
        inspectionType: inspection?.inspectionType?.description,
        businessPartnerName: inspection?.businessPartner?.name,
        inspectionPartnerName: inspection?.inspectionPartner?.name,
        equipmentName: inspection?.equipment?.name,
        equipmentSerialNumberCode: inspection?.equipmentSerialNumber?.code,
        licensePlate: inspection?.equipmentSerialNumber?.licensePlate,
        creatorUserName: inspection?.creatorUserName,
        lastModifierUserName: inspection?.lastModifierUserName,
        creationTime: inspection?.creationTime,
        lastModificationTime: inspection?.lastModificationTime,
      }));
    }

    return new Response(
      JSON.stringify({
        data: responseData,
        totalCount: data.totalCount,
      }),
    );
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
