import AWS = require('aws-sdk');
import { config } from './config/config';

// Configure AWS
const credentials = new AWS.SharedIniFileCredentials({ profile: config.aws_profile });
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: config.aws_region,
  params: { Bucket: config.aws_media_bucket },
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;
  // console.log('🚀 ~ file: aws.ts:35 ~ getPutSignedUrl ~ key:', key, config.aws_media_bucket);
  return s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    // Bucket: 'uda-p3-bushjdo',
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}