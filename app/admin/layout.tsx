'use client';

import React, { type ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { CmsAdminLayout, CmsModuleIcons } from 'litecms/admin';
import { extractLayoutProps } from 'litecms/admin/config';
import { cmsConfig } from '../cms/config';
import { useSession, signOut } from '../lib/auth-client';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.push('/login');
        }
    }, [isPending, session, router]);

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login');
                    router.refresh();
                },
            },
        });
    };

    if (isPending || !session) {
        return null;
    }

    const role =
        (session.user as { role?: string | null } | undefined)?.role ?? null;
    const isAdmin = role === 'admin';

    const adminModules = [
        {
            id: 'content',
            title: 'Website Content',
            href: '/admin',
            icon: CmsModuleIcons.pages,
        },
        {
            id: 'projects',
            title: 'Projects',
            href: '/admin/projects',
            icon: CmsModuleIcons.analytics,
        },
        {
            id: 'blog',
            title: 'Blog',
            href: '/admin/blog',
            icon: CmsModuleIcons.blog,
        },
        ...(isAdmin
            ? [
                  {
                      id: 'users',
                      title: 'Users',
                      href: '/admin/users',
                      icon: CmsModuleIcons.email,
                  },
              ]
            : []),
    ];

    // Determine which module is active
    const isBlogSection = pathname?.startsWith('/admin/blog');
    const isProjectsSection = pathname?.startsWith('/admin/projects');
    const isUsersSection = pathname?.startsWith('/admin/users');
    const layoutProps = extractLayoutProps(cmsConfig);
    const isContentSection =
        !isBlogSection && !isProjectsSection && !isUsersSection;

    return (
        <CmsAdminLayout
            {...layoutProps}
            modules={adminModules}
            // Only show pages when in the content section
            pages={isContentSection ? layoutProps.pages : []}
            onLogout={handleLogout}
        >
            {children}
        </CmsAdminLayout>
    );
}
