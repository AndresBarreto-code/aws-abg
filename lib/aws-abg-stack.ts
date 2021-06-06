import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import { ProcessEnv } from '../interfaces/ProcessEnv.interface';
import { BucketAccessControl, HttpMethods } from '@aws-cdk/aws-s3';
import * as origins from '@aws-cdk/aws-cloudfront-origins';

require('dotenv').config();

const { BUCKET_NAME, CF_NAME } = process.env as ProcessEnv;

export class AwsAbgStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const bucket = new s3.Bucket(this, BUCKET_NAME, {
      accessControl: BucketAccessControl.PUBLIC_READ,
      bucketName: BUCKET_NAME,
      cors: [{
        allowedHeaders: ['*'],
        allowedMethods: [
          HttpMethods.GET,
          HttpMethods.POST,
          HttpMethods.PUT,
          HttpMethods.HEAD ,
          HttpMethods.DELETE
        ],
        allowedOrigins: ['*']
      }],
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      versioned: false
    });
    new cloudfront.Distribution(this, CF_NAME, {
      defaultBehavior: { origin: new origins.S3Origin(bucket) },
    });
  }
}
