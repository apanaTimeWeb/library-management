import { PartialType } from '@nestjs/mapped-types';
import { IdCardsCreateIDCardDto } from './create-id-card.dto';

export class IdCardsUpdateIDCardDto extends PartialType(CreateIDCardDto) {}
