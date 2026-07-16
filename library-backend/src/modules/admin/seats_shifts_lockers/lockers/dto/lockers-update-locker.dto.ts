import { PartialType } from '@nestjs/mapped-types';
import { LockersCreateLockerDto } from './create-locker.dto';

export class LockersUpdateLockerDto extends PartialType(CreateLockerDto) {}
