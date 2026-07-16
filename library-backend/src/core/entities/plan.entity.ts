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
export class Plan extends BaseEntity {
  @ManyToOne(() => Branch)
  branch: Branch;

  @Column()
  name: string;

  @Column()
  duration: string;

  @Column('int')
  durationDays: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('simple-array', { nullable: true })
  features: string[];

  @Column({ default: 'Active' })
  status: string;
}
