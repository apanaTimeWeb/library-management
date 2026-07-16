import { PartialType } from '@nestjs/mapped-types';
import { IdCardsCreateIDCardDto } from './id-cards-create-id-card.dto';

export class IdCardsUpdateIDCardDto extends PartialType(IdCardsCreateIDCardDto) {}
