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
export class Seat extends BaseEntity {
  @Column()
  seatNumber: string; // A-01, B-12, etc.

  @ManyToOne(() => Branch)
  branch: Branch;

  @Column({ default: 'working' })
  status: string; // working, maintenance, broken

  @Column({ type: 'jsonb', default: [] })
  maintenanceLog: { date: Date; remark: string; doneBy?: string }[];

  @Column({ default: true })
  isActive: boolean;
}
