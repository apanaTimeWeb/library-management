import { PartialType } from '@nestjs/mapped-types';
import { CreateAssetDto } from '@/modules/manager/accounting/assets/dto/create-asset.dto';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {}
