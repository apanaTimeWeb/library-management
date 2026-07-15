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
export class Shift extends BaseEntity {

  @ManyToOne(() => Branch)
  branch: Branch;

  @Column()
  name: string; // Morning, Evening, Custom-1

  @Column('time')
  startTime: string;

  @Column('time')
  endTime: string;

  @Column({ default: true })
  isActive: boolean;
}
