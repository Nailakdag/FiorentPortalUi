import { GET_WORK_ORDERS_GET_ALL } from "@/contants/fiorentPortalApi";
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
      `${GET_WORK_ORDERS_GET_ALL}?${request.nextUrl.searchParams.toString()}`,
    );

    let responseData = [];

    if (!error) {
      responseData = data.items.map((item: any) => ({
        ...item,
        ...item.fleetWorkOrder,
        ...item.fleetWorkOrder?.fleetWorkOrderDamage,
        ...item?.fleetWorkOrderDamage,
        ...item?.service,
        licensePlate: item?.equipmentSerialNumber?.licensePlate,
        endingDate: item?.fleetWorkOrder?.endingDate,
        startingDate: item?.fleetWorkOrder?.startingDate,
        serviceName: item?.service?.name,
        subReasonName: item?.subReasonDescription,
        make: item?.equipmentMake?.description,
        model: item?.equipmentModel?.description,
        serviceReleaseKM: item?.fleetWorkOrder?.serviceReleaseKM,
        status: item?.fleetWorkOrder?.status,
        id: item?.fleetWorkOrder?.id,
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
