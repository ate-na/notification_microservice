import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';
import { PanelModule } from './panel/panel.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath:
        '/home/atena/Desktop/notification_micro/app/src/template/assets',
    }),
    EventEmitterModule.forRoot(),
    NotificationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UserModule,
    PanelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
