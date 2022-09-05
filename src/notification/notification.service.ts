import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateNotificationType } from './types/create-notification.types';
import {
  Notification,
  NotificationDocument,
  NotificationReciverRefPath,
  NotificationType,
  User,
} from '3dily-schema';
import { Cron } from '@nestjs/schedule';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';
import { PanelService } from 'src/panel/panel.service';
import { emailsList } from './email.utils';

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

  @Cron('*/10 * * * * *')
  async emailService() {
    console.log('Hi');
    let reciverEmail;
    let reciverName;
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() - 1);
    const email = await this.notificationModel.findOne({
      isEmailsend: false,
      sendingEmail: true,
      createdAt: { $lt: new Date(date) },
    });
    if (!email) return;
    console.log(email);
    if (email.senderRefPath === NotificationReciverRefPath.USER) {
      console.log(1);
      const user = await this.userService.findById(email.reciver[0].toString());
      console.log(user);
      if (!user) {
        console.log('shit');
        email.sendingEmail = true;
        email.save();
        return;
      } else {
        reciverEmail = user.email;
        reciverName = user.firstName;
      }
    } else if (email.senderRefPath === NotificationReciverRefPath.PANEL) {
      console.log(2);
      const panel = await this.panelService
        .findById(email.reciver[0].toString())
        .populate({
          path: 'users',
          model: User.name,
          populate: { path: 'user', model: User.name },
        });

      if (!panel) {
        console.log('Shit');
        email.sendingEmail = true;
        email.save();
        return;
      }
      const owner = panel.users.find((e) => e.isOwner);
      reciverEmail = panel.email ? panel.email : owner.user.email;
      reciverName = owner.user.firstName;
    }
    await this.mailService.send(
      reciverEmail,
      email.type,
      emailsList[email.type](reciverName, email.context),
    );
    if (
      email.type === NotificationType.FORGET_PASSWORD ||
      email.type === NotificationType.SIGNUP
    ) {
      email.context = 'Sending Email';
    }
    email.isEmailsend = true;
    email.save();
  }
}
