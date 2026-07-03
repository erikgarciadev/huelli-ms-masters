import { PartialType } from '@nestjs/swagger';
import { CreateShelterProfileDto } from './create-ShelterProfile.dto';

export class UpdateShelterProfileDto extends PartialType(CreateShelterProfileDto) {}
