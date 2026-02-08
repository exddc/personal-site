import { notFound } from "next/navigation";
import { CmsAdminPage } from "litecms/admin";
import { extractPageProps } from "litecms/admin/config";
import { cmsConfig } from "../../cms/config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AdminDynamicPage({ params }: PageProps) {
  const { slug } = await params;

  const props = await extractPageProps(cmsConfig, slug);

  if (!props) {
    notFound();
  }

  return <CmsAdminPage {...props} />;
}

export function generateStaticParams() {
  return cmsConfig.pages.map((page) => ({
    slug: page.slug,
  }));
}
