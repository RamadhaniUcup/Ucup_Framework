
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerAddressesService } from './customer-addresses.service.js';
import { CustomerAddressesController } from './customer-addresses.controller.js';
import { CustomerAddress } from './entities/customer-address.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAddress])],
  controllers: [CustomerAddressesController],
  providers: [CustomerAddressesService],
})
export class CustomerAddressesModule {}
