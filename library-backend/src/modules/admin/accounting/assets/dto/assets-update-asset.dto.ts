import { PartialType } from '@nestjs/swagger';
import { AssetsCreateAssetDto } from './assets-create-asset.dto';
export class AssetsUpdateAssetDto extends PartialType(AssetsCreateAssetDto) {}