"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CmsAdminLayout } from "litecms/admin";
import { extractLayoutProps } from "litecms/admin/config";
import { cmsConfig } from "../cms/config";
import { useSession, signOut } from "../lib/auth-client";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  if (isPending || !session) {
    return null;
  }

  return (
    <CmsAdminLayout {...extractLayoutProps(cmsConfig)} onLogout={handleLogout}>
      {children}
    </CmsAdminLayout>
  );
}
