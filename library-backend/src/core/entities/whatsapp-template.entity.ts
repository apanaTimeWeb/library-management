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
import { User } from './/user.entity';

@Entity()
export class WhatsAppTemplate extends BaseEntity {

  @ManyToOne(() => Branch)
  branch: Branch;

  @Column()
  templateType: string; // welcome, fee_reminder, renewal_alert, receipt, notice, absentee_alert, ptp_reminder

  @Column('text')
  messageBody: string; // e.g. "Hi {name}, your fee of ₹{amount} is due on {duedate}."

  @Column({ type: 'jsonb', default: [] })
  variables: string[]; // ['name', 'amount', 'duedate', 'planname', 'libraryname', 'phone', 'seat']

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User)
  updatedBy: User;
}
