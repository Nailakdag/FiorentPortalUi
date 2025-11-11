import {
  DELETE_INSPECTION_DELETE,
  GET_INSPECTION_FOR_EDIT,
  POST_INSPECTION_CREATE_OR_EDIT,
} from "@/contants/fiorentPortalApi";
import { authOptions } from "@/lib/auth";
import {
  deleteFromFiorentApi,
  fetchFromFiorentApi,
  postToFiorentApi,
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
    const id = searchParams.get("id");

    const queryParams = setSearchParams({ id });
    const { data, error } = await fetchFromFiorentApi(
      `${GET_INSPECTION_FOR_EDIT}?${queryParams}`,
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

    const requestData = await request.json();

    const response = await postToFiorentApi(
      POST_INSPECTION_CREATE_OR_EDIT,
      requestData,
    );

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
      `${DELETE_INSPECTION_DELETE}?${queryParams}`,
      null,
    );

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
