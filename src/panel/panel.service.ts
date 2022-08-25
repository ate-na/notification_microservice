import { Panel, PanelDocument } from '3dily-schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PanelService {
  constructor(
    @InjectModel(Panel.name) private readonly PanelModel: Model<PanelDocument>,
  ) {}

  findById(id: string) {
    return this.PanelModel.findById(id);
  }
}
