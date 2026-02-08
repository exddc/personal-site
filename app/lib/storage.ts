import { createStorageClient } from "litecms/storage";

const storage = createStorageClient({
  endpoint: process.env.STORAGE_URL!,
  region: process.env.STORAGE_REGION || "us-east-1",
  accessKeyId: process.env.STORAGE_ACCESS_KEY || "minioadmin",
  secretAccessKey: process.env.STORAGE_SECRET_KEY || "minioadmin",
  bucket: process.env.STORAGE_BUCKET || "personal-site",
  forcePathStyle: true,
  publicUrlBase: "/api/storage/images",
});

export const uploadFile = storage.uploadFile;
export const listFiles = storage.listFiles;
export const deleteFile = storage.deleteFile;
export const getFile = storage.getFile;

export const s3Client = storage.s3Client;
export const bucket = storage.bucket;

export { storage };
