import { PartialType } from '@nestjs/mapped-types';
import { CreateIDCardDto } from '@/modules/manager/students/id-cards/dto/create-idcard.dto';

export class UpdateIDCardDto extends PartialType(CreateIDCardDto) {}
