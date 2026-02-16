import React from 'react';
import { redirect } from 'next/navigation';
import { CmsUsersAdmin } from 'litecms/admin';
import { requireAdminSession } from '@/app/lib/authz';

export default async function AdminUsersPage() {
    const adminSession = await requireAdminSession();

    if (!adminSession) {
        redirect('/admin');
    }

    return <CmsUsersAdmin usersEndpoint="/api/admin/users" />;
}
