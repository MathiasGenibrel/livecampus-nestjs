import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

enum RegionAWS {
  PARIS = 'eu-west-3',
}

@Injectable()
export class UploadFileService {
  constructor() {}

  async upload(file: Express.Multer.File): Promise<void> {
    const client = new S3Client({
      region: RegionAWS.PARIS,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_PASSWORD,
      },
    });

    try {
      await client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: file.originalname,
          Body: file.buffer,
        }),
      );
    } catch (e) {
      console.error(e);
    }
  }
}
