import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { File, FileStorageService } from './file-storage';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'node:stream';
import { FileNotFoundError } from '../errors/file-not-found.error';
import { RegionAWS } from '../../globals/aws-region';
import { z } from 'zod';

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

  async getAll() {
    const commandOutput = await this.client.send(
      new ListObjectsCommand({
        Bucket: process.env.S3_BUCKET,
      }),
    );

    const contents = commandOutput.Contents ?? [];

    return contents
      .map((content): Pick<Express.Multer.File, 'filename' | 'size'> | null => {
        try {
          const validatedContent = this.objectPipeValidation(content);

          return {
            filename: validatedContent.Key,
            size: validatedContent.Size,
          };
        } catch (error) {
          console.warn('Error while validating content', error);
          return null;
        }
      })
      .filter((content) => {
        console.log('FILTER', content);
        return content !== null;
      });
  }

  private objectPipeValidation(content: unknown) {
    const schema = z
      .object({
        Key: z.string(),
        LastModified: z.string(),
        ETag: z.string(),
        Size: z.number(),
        StorageClass: z.string(),
        Owner: z.object({
          ID: z.string(),
        }),
      })
      .omit({
        ETag: true,
        StorageClass: true,
        Owner: true,
        LastModified: true,
      });

    return schema.parse(content);
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
