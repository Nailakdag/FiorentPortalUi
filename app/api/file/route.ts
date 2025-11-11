import {
  DELETE_FILE_RECORDS,
  GET_FILES,
  UPLOAD_FILES,
} from "@/contants/fiorentPortalApi";
import { authOptions } from "@/lib/auth";
import {
  deleteFromFiorentApi,
  fetchFromFiorentApi,
  postToFilesFiorentApi,
} from "@/lib/fiorentPortalApi";

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
    const relatedRecordId = searchParams.get("id");
    const appModule = searchParams.get("appModule");

    const queryParams = setSearchParams({ relatedRecordId, appModule });

    const { data, error } = await fetchFromFiorentApi(
      `${GET_FILES}?${queryParams}`,
    );

    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const formvalue = await request.formData();

    const response = await postToFilesFiorentApi(UPLOAD_FILES, formvalue);

    if (!response?.ok) {
      return new Response(null, { status: 500 });
    }

    const { result: data, error } = await response.json();

    if (error) {
      return new Response(null, { status: 500 });
    }

    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    const queryParams = setSearchParams({ id });

    const response = await deleteFromFiorentApi(
      `${DELETE_FILE_RECORDS}?${queryParams}`,
      null,
    );

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
