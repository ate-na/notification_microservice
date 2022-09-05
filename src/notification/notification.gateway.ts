import { Req } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ReadNotificationDto } from './dto/read-notification.dto';
import { NotificationService } from './notification.service';

@WebSocketGateway({ cors: true })
export class NotificationGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket, ...args: any[]) {
    console.log('fdfdfd');
    const token = client.handshake?.auth?.token;
    try {
      const payload: {
        userId: string;
        actions: [];
        panel: {
          panelId: string;
          permissions: string[];
          isOwner: boolean;
        };
        iat: Date;
        exp: Date;
      } = await this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY_APP,
        ignoreExpiration: true,
      });
      !client.rooms.has(payload.userId) && client.join(payload.userId);
      !client.rooms.has(payload.panel.panelId) &&
        client.join(payload.panel.panelId);
    } catch (error) {
      try {
        const x: { iat: Date; exp: Date; userId: string } =
          await this.jwtService.verify(token, {
            secret: process.env.SECRET_KEY,
          });
        console.log(
          'fdfdfdf',
          !client.rooms.has(x.userId) && client.join(x.userId),
        );
        !client.rooms.has(x.userId) && client.join(x.userId);
      } catch (error) {
        client.disconnect();
      }
    }
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  // @EventPattern('AAAA')
  // @SubscribeMessage('event')
  // @EventPattern('add_product')
  @OnEvent('notification_gateway')
  async handleEvent(data: any) {
    const notification = await this.notificationService.create({
      context: data.context,
      reciver: data.reciver,
      senderRefPath: data.senderRefPath,
      sendingNotification: data.sendingNotification,
      type: data.type,
      read: false,
      sendingEmail: data.sendingEmail,
    });
    if (notification.sendingNotification) {
      const recivers = notification.reciver.map((e) => e.toString());

      this.server.to(recivers).emit('notification', {
        data: notification,
        event: notification.type,
      });
    }
  }

  @SubscribeMessage('read')
  async handleReadingMessages(
    @Req() req: any,
    @MessageBody() data: ReadNotificationDto,
  ) {
    const notification = await this.notificationService.findNotification(
      data.id,
      data.reciver,
    );
    if (!notification) return;

    const result = await this.notificationService.findReadNotification(
      (notification as any).createdAt,
      data.reciver,
    );

    await this.notificationService.updateReadNotification(
      (notification as any).createdAt,
      data.reciver,
    );
    this.server.to(data.reciver).emit('notification', {
      type: 'UPDATE',
      data: result.map((e) => {
        return { ...(e as any)._doc, read: true };
      }),
    });
  }
}
