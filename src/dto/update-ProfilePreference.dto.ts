import { PartialType } from '@nestjs/swagger';
import { CreateProfilePreferenceDto } from './create-ProfilePreference.dto';

export class UpdateProfilePreferenceDto extends PartialType(CreateProfilePreferenceDto) {}
