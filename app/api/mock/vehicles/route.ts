// app/api/mock/vehicles/route.ts
import { mockVehicleData } from "@/lib/mockVehicleData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Parse query parameters
  const maxResultCount = parseInt(searchParams.get("maxResultCount") || "10");
  const sorting = searchParams.get("sorting") || "";
  const filter = searchParams.get("filter") || "";
  const skipCount = parseInt(searchParams.get("skipCount") || "0");

  // Get other filters
  const durum = searchParams.get("durum");
  const sigortaDurumu = searchParams.get("sigortaDurumu");

  // Start with all data
  let filteredData = [...mockVehicleData];

  // Apply status filter
  if (durum) {
    filteredData = filteredData.filter((item) => item.durum === durum);
  }

  // Apply insurance status filter
  if (sigortaDurumu) {
    filteredData = filteredData.filter(
      (item) => item.sigortaDurumu === sigortaDurumu,
    );
  }

  // Apply global filter
  if (filter) {
    filteredData = filteredData.filter((item) =>
      Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(filter.toLowerCase()),
      ),
    );
  }

  if (sorting) {
    const [field, order] = sorting.split(" ");
    if (field) {
      filteredData.sort((a, b) => {
        const aVal = a[field as keyof typeof a];
        const bVal = b[field as keyof typeof b];

        if (order === "asc") {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }
  }

  // Calculate total count before pagination
  const totalCount = filteredData.length;

  // Apply pagination
  const paginatedData = filteredData.slice(
    skipCount,
    skipCount + maxResultCount,
  );

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return response in the format expected by useTableData
  return NextResponse.json({
    data: paginatedData,
    totalCount: totalCount,
  });
}
