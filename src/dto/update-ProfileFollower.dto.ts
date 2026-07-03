import { PartialType } from '@nestjs/swagger';
import { CreateProfileFollowerDto } from './create-ProfileFollower.dto';

export class UpdateProfileFollowerDto extends PartialType(CreateProfileFollowerDto) {}
