import { Module } from '@nestjs/common';
import { PanelService } from './panel.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Panel, PanelSchema } from '3dily-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Panel.name, schema: PanelSchema }]),
  ],
  controllers: [],
  providers: [PanelService],
  exports: [PanelService],
})
export class PanelModule {}
