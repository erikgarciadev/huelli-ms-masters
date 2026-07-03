import { PartialType } from '@nestjs/swagger';
import { CreateUserProfileDto } from './create-UserProfile.dto';

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {}
