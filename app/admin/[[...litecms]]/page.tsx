import { LiteCMS } from "litecms/next";
import { liteCMS } from "@/app/cms/litecms";

type AdminCatchAllPageProps = {
  params: Promise<{ litecms?: string[] }>;
};

export default async function AdminCatchAllPage({
  params,
}: AdminCatchAllPageProps) {
  const resolvedParams = await params;
  return <LiteCMS cms={liteCMS} params={Promise.resolve(resolvedParams)} />;
}
