import { BaseEntity } from './base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Branch } from './/branch.entity';
import { User } from './/user.entity';

@Entity()
@Unique(['branch', 'date'])
export class Holiday extends BaseEntity {

  @ManyToOne(() => Branch)
  branch: Branch;

  @Column('date')
  date: Date;

  @Column()
  name: string; // "Holi", "Diwali", "Republic Day", "Library Maintenance Day"

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isRecurringYearly: boolean; // true = har saal same date par repeat hoga

  @ManyToOne(() => User)
  createdBy: User;
}
