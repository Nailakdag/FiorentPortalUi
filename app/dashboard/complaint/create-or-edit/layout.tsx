import MainForm from "./main-form";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainForm lookups={{}}>{children}</MainForm>;
}
