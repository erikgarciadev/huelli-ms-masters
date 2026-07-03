import { PartialType } from '@nestjs/swagger';
import { CreateUserStatusDto } from './create-UserStatus.dto';

export class UpdateUserStatusDto extends PartialType(CreateUserStatusDto) {}
