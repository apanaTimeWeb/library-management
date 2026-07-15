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
export class BulkImport extends BaseEntity {

  @ManyToOne(() => Branch)
  branch: Branch;

  @Column()
  entityType: string; // student, seat, locker, etc.

  @Column()
  fileName: string;

  @Column('int')
  totalRows: number;

  @Column('int')
  successCount: number;

  @Column('int')
  failureCount: number;

  @Column({ type: 'jsonb', default: [] })
  errors: { row: number; error: string }[];

  @ManyToOne(() => User)
  uploadedBy: User;

  @CreateDateColumn()
  uploadedAt: Date;
}
