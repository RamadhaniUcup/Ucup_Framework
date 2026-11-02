
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItemsService } from './order-items.service.js';
import { OrderItemsController } from './order-items.controller.js';
import { OrderItem } from './entities/order-item.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
