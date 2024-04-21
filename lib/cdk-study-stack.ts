import * as cdk from 'aws-cdk-lib';
import { SqsDestination } from 'aws-cdk-lib/aws-s3-notifications';
import { Bucket, CfnBucket, EventType } from 'aws-cdk-lib/aws-s3';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStudyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   const level1S3Bucket = new CfnBucket(this, 'level1ConstructBucket', {
    versioningConfiguration: {
      status: "Enabled"
    }
   });

   const level2S3Bucket = new Bucket(this, 'level2ConstructBucket', {
    bucketName: 'level2-construct-bucket-mss',
    versioned: true
  })

    const queue = new Queue(this, 'MyQueue', {
      queueName: 'MyQueue'
    })

    level2S3Bucket.addEventNotification(EventType.OBJECT_CREATED, new SqsDestination(queue))
  };


}
