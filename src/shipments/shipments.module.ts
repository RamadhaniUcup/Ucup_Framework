import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service.js';
import { ShipmentsController } from './shipments.controller.js';

@Module({
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
})
export class ShipmentsModule {}
