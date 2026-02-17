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
            title: 'Inhalte',
            href: '/admin',
            icon: CmsModuleIcons.pages,
        },
        {
            id: 'projects',
            title: 'Projekte',
            href: '/admin/projects',
            icon: CmsModuleIcons.analytics,
        },
        {
            id: 'blog',
            title: 'Blog',
            href: '/admin/blog',
            icon: CmsModuleIcons.blog,
        },
        {
            id: 'account',
            title: 'Konto',
            href: '/admin/account',
            icon: CmsModuleIcons.pages,
        },
        ...(isAdmin
            ? [
                  {
                      id: 'users',
                      title: 'Benutzer',
                      href: '/admin/users',
                      icon: CmsModuleIcons.email,
                  },
              ]
            : []),
    ];

    const isBlogSection = pathname?.startsWith('/admin/blog');
    const isProjectsSection = pathname?.startsWith('/admin/projects');
    const isUsersSection = pathname?.startsWith('/admin/users');
    const isAccountSection = pathname?.startsWith('/admin/account');
    const layoutProps = extractLayoutProps(cmsConfig);
    const isContentSection =
        !isBlogSection &&
        !isProjectsSection &&
        !isUsersSection &&
        !isAccountSection;

    return (
        <CmsAdminLayout
            {...layoutProps}
            modules={adminModules}
            pages={isContentSection ? layoutProps.pages : []}
            onLogout={handleLogout}
        >
            {children}
        </CmsAdminLayout>
    );
}
