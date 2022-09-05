import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationGateway } from './notification.gateway';
import { NotificationController } from './notification.controller';
import { JwtModule } from '@nestjs/jwt';
import {
  Notification,
  NotificationSchema,
  NotificationType,
} from '3dily-schema';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from '../mail/mail.module';
import { PanelModule } from 'src/panel/panel.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MailModule,
    PanelModule,
    UserModule,
    JwtModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  exports: [NotificationService, NotificationGateway],
})
export class NotificationModule {}
