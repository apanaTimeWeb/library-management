import { PartialType } from '@nestjs/mapped-types';
import { CreateWaitlistDto } from '@/modules/manager/crm/waitlists/dto/create-waitlist.dto';

export class UpdateWaitlistDto extends PartialType(CreateWaitlistDto) {}
