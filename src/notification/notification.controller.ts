import { Controller } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventPattern } from '@nestjs/microservices';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
    private readonly emitEventer: EventEmitter2,
  ) {}

  @EventPattern('notification_microservice')
  productCopy(data: any) {
    console.log('data', data);  
    this.emitEventer.emit('notification_gateway', data);
  }
}
