import { PartialType } from '@nestjs/mapped-types';
import { CreateIDCardDto } from './create-idcard.dto';

export class UpdateIDCardDto extends PartialType(CreateIDCardDto) {}
