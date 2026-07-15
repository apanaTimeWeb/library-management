import { BaseEntity } from './base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Asset } from './asset.entity';
import { User } from './/user.entity';

@Entity()
export class AssetMaintenanceLog extends BaseEntity {
  @ManyToOne(() => Asset)
  asset: Asset;

  @Column()
  remark: string;

  @Column('date')
  nextDueDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column('date')
  servicedDate: Date;

  @ManyToOne(() => User)
  servicedBy: User;
}
