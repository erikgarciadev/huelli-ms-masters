import { PartialType } from '@nestjs/swagger';
import { CreateRescuerProfileDto } from './create-RescuerProfile.dto';

export class UpdateRescuerProfileDto extends PartialType(CreateRescuerProfileDto) {}
