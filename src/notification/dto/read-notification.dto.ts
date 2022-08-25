import { IsBoolean, IsMongoId, IsString } from 'class-validator';

export class ReadNotificationDto {
  @IsMongoId()
  @IsString()
  reciver: string;

  @IsMongoId()
  @IsString()
  id: string;
}
