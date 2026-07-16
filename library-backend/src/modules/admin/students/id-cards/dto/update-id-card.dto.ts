import { PartialType } from '@nestjs/mapped-types';
import { CreateIDCardDto } from './create-id-card.dto';

export class UpdateIDCardDto extends PartialType(CreateIDCardDto) {}
