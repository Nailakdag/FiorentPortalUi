import { Suspense } from "react";
import MainForm from "./main-form";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainForm lookups={{}}>{children}</MainForm>
    </Suspense>
  );
}
