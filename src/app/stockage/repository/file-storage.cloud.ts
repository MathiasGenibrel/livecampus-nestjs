import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { File, FileStorageService } from './file-storage';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'node:stream';
import { FileNotFoundError } from '../errors/file-not-found.error';
import { RegionAWS } from '../../globals/aws-region';

export class FileStorageCloud implements FileStorageService {
  private readonly client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new S3Client({
      region: RegionAWS.PARIS,
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_PASSWORD'),
      },
    });
  }

  async setFile(key: string, file: Express.Multer.File) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
  }

  async getFile(key: string): Promise<File> {
    try {
      const response = await this.client.send(
        new GetObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: key,
        }),
      );

      return {
        stream: Readable.from(response.Body.transformToWebStream()),
        mimetype: response.ContentType || 'application/octet-stream',
      };
    } catch (error) {
      throw new FileNotFoundError('File not found or does not exist', {
        filename: key,
      });
    }
  }

  async removeFile(key: string) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
      }),
    );
  }
}
