import { PartialType } from '@nestjs/mapped-types';
import { LockersCreateLockerDto } from './lockers-create-locker.dto';

export class LockersUpdateLockerDto extends PartialType(LockersCreateLockerDto) {}
