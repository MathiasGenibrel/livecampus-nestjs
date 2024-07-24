import { DefaultLog, LogsStorageService } from './logs-storage';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { RegionAWS } from '../../globals/aws-region';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

export class LogsStorageCloud implements LogsStorageService {
  private readonly client: DynamoDBClient;
  private readonly docClient: DynamoDBDocumentClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new DynamoDBClient({
      region: RegionAWS.PARIS,
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_PASSWORD'),
      },
    });

    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  public async setItem(key: string, value: DefaultLog): Promise<void> {
    await this.docClient.send(
      new PutCommand({
        TableName: key,
        Item: value,
      }),
    );
  }
}
