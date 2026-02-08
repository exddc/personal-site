'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { createSaveAction } from 'litecms/server';
import { cmsDocuments } from '@/app/db/schema';
import { getDb } from '@/app/db';
import { getAuth } from '@/app/lib/auth';
import {
  HomePageSchema,
  type HomePageData,
  SiteSettingsSchema,
  type SiteSettingsData,
  homePageDefaults,
  siteSettingsDefaults,
} from '@/app/cms/schema';

async function saveDocument(key: string, data: unknown) {
  const db = getDb();
  if (!db) {
    throw new Error('DATABASE_URL is not configured');
  }

  await db
    .insert(cmsDocuments)
    .values({
      key,
      data,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: cmsDocuments.key,
      set: {
        data,
        updatedAt: new Date(),
      },
    });
}

async function getDocument<T>(key: string): Promise<T | null> {
  const db = getDb();
  if (!db) return null;

  const doc = await db.query.cmsDocuments.findFirst({
    where: eq(cmsDocuments.key, key),
  });

  return (doc?.data as T) ?? null;
}

async function checkAuthenticated(): Promise<boolean> {
  const auth = getAuth();
  if (!auth) return false;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return !!session?.user;
}

export const saveSiteSettings = createSaveAction(SiteSettingsSchema, {
  save: async (data) => saveDocument('site-settings', data),
  revalidatePath: '/',
  onRevalidate: () => {
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/blog');
  },
  checkAuth: checkAuthenticated,
});

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const data = await getDocument<SiteSettingsData>('site-settings');

  if (!data) return siteSettingsDefaults;

  const result = SiteSettingsSchema.safeParse(data);
  return result.success ? result.data : siteSettingsDefaults;
}

export const saveHomePage = createSaveAction(HomePageSchema, {
  save: async (data) => saveDocument('home-page', data),
  revalidatePath: '/',
  onRevalidate: () => {
    revalidatePath('/');
  },
  checkAuth: checkAuthenticated,
});

export async function getHomePage(): Promise<HomePageData> {
  const data = await getDocument<HomePageData>('home-page');

  if (!data) return homePageDefaults;

  const result = HomePageSchema.safeParse(data);
  return result.success ? result.data : homePageDefaults;
}

