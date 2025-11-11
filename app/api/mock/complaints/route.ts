import { mockComplaintData } from "@/lib/mockComplaintData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Parse query parameters
  const maxResultCount = parseInt(searchParams.get("maxResultCount") || "10");
  const sorting = searchParams.get("sorting") || "";
  const filter = searchParams.get("filter") || "";
  const skipCount = parseInt(searchParams.get("skipCount") || "0");

  // Start with all data
  let filteredData = [...mockComplaintData];

  // Apply global filter
  if (filter) {
    filteredData = filteredData.filter((item) =>
      Object.values(item).some((value: any) => {
        if (value === null || value === undefined) return false;
        if (typeof value === "object" && value.label) {
          return value.label
            .toString()
            .toLowerCase()
            .includes(filter.toLowerCase());
        }
        return value.toString().toLowerCase().includes(filter.toLowerCase());
      }),
    );
  }

  // Apply sorting
  if (sorting) {
    const [field, order] = sorting.split(" ");
    if (field) {
      filteredData.sort((a, b) => {
        let aVal: any = a[field as keyof typeof a];
        let bVal: any = b[field as keyof typeof b];

        // Handle nested objects (like complaintType.label)
        if (typeof aVal === "object" && aVal?.label) {
          aVal = aVal.label;
        }
        if (typeof bVal === "object" && bVal?.label) {
          bVal = bVal.label;
        }

        // Handle dates
        if (field === "complaintDate") {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }

        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

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
