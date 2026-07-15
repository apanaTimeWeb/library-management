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
export class Locker extends BaseEntity {
  

  @Column()
  lockerNumber: string;

  @ManyToOne(() => Branch)
  branch: Branch;

  @Column({ default: 'working' })
  status: string;

  @Column({ default: true })
  isActive: boolean;

  

  
}
