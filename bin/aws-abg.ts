#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsAbgStack } from '../lib/aws-abg-stack';
import { ProcessEnv } from '../interfaces/ProcessEnv.interface';

const { STACK_NAME, ACCESS_KEY_ID, SECRET_ACCESS_KEY, CDK_DEFAULT_REGION } = process.env as ProcessEnv;

const app = new cdk.App();
new AwsAbgStack(app, STACK_NAME, {
  env: { account: ACCESS_KEY_ID, region: CDK_DEFAULT_REGION },
});
