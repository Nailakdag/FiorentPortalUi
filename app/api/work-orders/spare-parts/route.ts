import { GET_FLEET_WORK_ORDER_SPARE_PARTS_GET_ALL } from "@/contants/fiorentPortalApi";
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
      `${GET_FLEET_WORK_ORDER_SPARE_PARTS_GET_ALL}?${request.nextUrl.searchParams.toString()}`,
    );

    let responseData = [];

    if (!error) {
      responseData = data?.items.map((x: any) => {
        const item = x;
        return {
          ...x,
          quantity: item?.fleetWorkOrderSparePart?.quantity,
          unitPrice: item?.fleetWorkOrderSparePart?.unitPrice,
          proformaAmount: item?.fleetWorkOrderSparePart?.proformaAmount,
          discountRate: item?.fleetWorkOrderSparePart?.discountRate,
          totalAmount: item?.fleetWorkOrderSparePart?.totalAmount,
          taxRateId: item?.fleetWorkOrderSparePart?.taxRateId,
          vatAmount: item?.fleetWorkOrderSparePart?.vatAmount,
          amountIncludingVAT: item?.fleetWorkOrderSparePart?.amountIncludingVAT,
          reflectedAmount: item?.fleetWorkOrderSparePart?.reflectedAmount,
          status: item?.fleetWorkOrderSparePart?.generalStatus,
          materialType: item?.fleetWorkOrderSparePart?.materialType,
          usedMaterialClass: item?.fleetWorkOrderSparePart?.usedMaterialClass,
          isReflected: item?.fleetWorkOrderSparePart?.isReflected,
          isGuarantee: item?.fleetWorkOrderSparePart?.isGuarantee,
          reflectedTo: item?.fleetWorkOrderSparePart?.reflectedTo,
          reflectedBusinessPartnerId:
            item?.fleetWorkOrderSparePart?.reflectedBusinessPartnerId,
          fleetWorkOrderId: item?.fleetWorkOrderSparePart?.fleetWorkOrderId,
          unitOfMeasureId: item?.fleetWorkOrderSparePart?.unitOfMeasureId,
          equipmentSerialNumberId:
            item?.fleetWorkOrderSparePart?.equipmentSerialNumberId,
          equipmentId: item?.fleetWorkOrderSparePart?.equipmentId,
          _apiItem: item,
          id: item?.fleetWorkOrderSparePart?.id,
          // Table columns
          equipmentName: item?.equipment?.name,
          usedMaterialClassName:
            item?.fleetWorkOrderSparePart?.usedMaterialClass,
          materialTypeName: item?.fleetWorkOrderSparePart?.materialType,
          unitOfMeasureName: item.unitOfMeasure?.description,
          reflectedType: item?.fleetWorkOrderSparePart?.reflectedTo,
          reflectedBusinessPartnerName: item?.reflectedBusinessPartner?.name,
          serviceName: item?.serviceName,
          startingDate: item?.fleetWorkOrder?.startingDate,
          endingDate: item?.fleetWorkOrder?.endingDate,
          planningStartingDate: item?.fleetWorkOrder?.planningStartingDate,
          planningEndingDate: item?.fleetWorkOrder?.planningEndingDate,
          serviceReleaseKM: item?.fleetWorkOrder?.serviceReleaseKM,
          km: item?.fleetWorkOrder?.km,
          taxRate: item?.taxRate?.description,
        };
      });
    }

    return new Response(
      JSON.stringify({ data: responseData, totalCount: data.totalCount }),
    );
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
