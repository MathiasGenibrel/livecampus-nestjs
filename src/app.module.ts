import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockageModule } from './app/stockage/stockage.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleRootOption } from './app/globals/config-module-root-option';
import { DatetimeModule } from './app/globals/datetime/datetime.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleRootOption),
    DatetimeModule,
    StockageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
