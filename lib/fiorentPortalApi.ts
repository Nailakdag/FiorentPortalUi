import { getCurrentUser } from "./session";

export const fetchFromFiorentApi = async (
  url: string,
  headers?: any,
  body?: any,
  options?: any,
) => {
  const user = await getCurrentUser();
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
      ...(headers ? { ...headers } : {}),
    },
    ...options,
    body: JSON.stringify(body),
  });

  if (!response?.ok) {
    await handleFiorentApiErrors(response?.status);
    // Return early with error if response is not ok
    return {
      data: null,
      error: { status: response.status, message: response.statusText },
    };
  }

  // Check if response is JSON before parsing
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    return {
      data: null,
      error: { message: "Response is not JSON", body: text },
    };
  }

  const { result: data, error } = await response.json();

  return { data, error };
};

export const postToFiorentApi = async (
  url: string,
  body: any,
  headers?: any,
  options?: any,
) => {
  const user = await getCurrentUser();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
      ...(headers ? { ...headers } : {}),
    },
    ...options,
    body: JSON.stringify(body),
  });

  return response;
};

export const deleteFromFiorentApi = async (
  url: string,
  body: any,
  headers?: any,
) => {
  const user = await getCurrentUser();
  const response = await fetch(url, {
    method: "DELETE", // HTTP DELETE methodu kullanılıyor
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
      ...(headers ? { ...headers } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response?.ok) {
    await handleFiorentApiErrors(response?.status);
    // Return early with error if response is not ok
    return {
      data: null,
      error: { status: response.status, message: response.statusText },
    };
  }

  // Check if response is JSON before parsing
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    return {
      data: null,
      error: { message: "Response is not JSON", body: text },
    };
  }

  const { result: data, error } = await response.json();
  return { data, error };
};

const handleFiorentApiErrors = async (statusCode: number) => {
  switch (statusCode) {
    case 401:
      // throw new Error(JSON.stringify({ status: statusCode }));

      break;
  }
};

export const postToFilesFiorentApi = async (
  url: string,
  formData: FormData,
  headers?: any,
  options?: any,
) => {
  const user = await getCurrentUser();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      ...(headers ? { ...headers } : {}),
    },
    ...options,
    body: formData,
  });

  return response;
};

export const getToFilesFiorentApi = async (
  url: string,

  headers?: any,
  options?: any,
) => {
  const user = await getCurrentUser();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      ...(headers ? { ...headers } : {}),
    },
    ...options,
  });

  return response;
};
