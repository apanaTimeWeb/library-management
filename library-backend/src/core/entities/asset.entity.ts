import { BaseEntity } from './base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Branch } from './/branch.entity';

@Entity()
export class Asset extends BaseEntity {

  @ManyToOne(() => Branch)
  branch: Branch;

  @Column()
  name: string; // AC, Fan, Projector

  @Column('int')
  quantity: number;

  @Column({ nullable: true })
  purchaseDate: Date;

  @Column({ default: 'working' })
  status: string; // working, maintenance, broken
}
