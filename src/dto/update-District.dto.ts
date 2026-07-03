import { PartialType } from '@nestjs/swagger';
import { CreateDistrictDto } from './create-District.dto';

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}
