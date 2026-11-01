
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from './order.entity.js';

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({
    name: 'shipping_courier',
    type: 'varchar',
    length: 100,
  })
  shippingCourier: string;

  @Column({
    name: 'tracking_number',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  trackingNumber: string | null;

  @Column({
    name: 'shipment_status',
    type: 'varchar',
    length: 30,
    default: 'pending',
  })
  shipmentStatus: string;

  @Column({
    name: 'shipped_at',
    type: 'timestamp',
    nullable: true,
  })
  shippedAt: Date | null;

  @Column({
    name: 'delivered_at',
    type: 'timestamp',
    nullable: true,
  })
  deliveredAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
