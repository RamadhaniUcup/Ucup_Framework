
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Customer } from '../../customers/entities/customer.entity.js';
import { CustomerAddress } from '../../customer-addresses/entities/customer-address.entity.js';
import { OrderItem } from '../../order-items/entities/order-item.entity.js';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'order_number',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  orderNumber: string | null;

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => CustomerAddress, { nullable: true })
  @JoinColumn({ name: 'customer_address_id' })
  customerAddress: CustomerAddress | null;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  totalAmount: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: 'pending',
  })
  status: string;

  @Column({
    name: 'shipping_address',
    type: 'text',
    nullable: true,
  })
  shippingAddress: string | null;

  @Column({
    name: 'order_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  orderDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
