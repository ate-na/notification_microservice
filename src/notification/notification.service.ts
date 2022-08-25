import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateNotificationType } from './types/create-notification.types';
import {
  Notification,
  NotificationDocument,
  NotificationReciverRefPath,
} from '3dily-schema';
import { Cron } from '@nestjs/schedule';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';
import { PanelService } from 'src/panel/panel.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly panelService: PanelService,
  ) {}

  create(data: CreateNotificationType) {
    return this.notificationModel.create(data);
  }

  getEmailToNotification() {
    return this.notificationModel.find({
      read: false,
      sendingEmail: true,
      updatedAt: { $gte: new Date(Date.now()) },
    });
  }

  findNotification(id: string, reciver: string) {
    return this.notificationModel.findOne(
      {
        _id: new Types.ObjectId(id),
        reciver: new Types.ObjectId(reciver),
      },
      // { createdAt: 1 },
    );
  }

  findReadNotification(date: Date, reciver: string) {
    return this.notificationModel.find({
      createdAt: { $lt: date },
      reciver: new Types.ObjectId(reciver),
      read: false,
    });
  }

  updateReadNotification(date: Date, reciver: string) {
    return this.notificationModel.updateMany(
      {
        createdAt: { $lt: date },
        reciver: new Types.ObjectId(reciver),
      },
      { read: true },
    );
  }

  @Cron('1 * * * * *')
  async emailService() {
    let reciver;
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() - 10);
    const email = await this.notificationModel.findOne({
      read: false,
      isEmailsend: false,
      sendingEmail: true,
      createdAt: { $lt: new Date(date) },
    });
    console.log(email);
    if (!email) return;
    if (email.senderRefPath === NotificationReciverRefPath.USER) {
      reciver = await this.userService.findById(email.reciver[0].toString());
    } else if (email.senderRefPath === NotificationReciverRefPath.PANEL) {
      reciver = await this.panelService.findById(email.reciver[0].toString());
    }
    console.log('new email', email, reciver.email);
    await this.mailService.send(reciver.email, '3DILY', email.context);
    email.isEmailsend = true;
    email.save();
  }
}
