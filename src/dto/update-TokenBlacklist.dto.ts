import { PartialType } from '@nestjs/swagger';
import { CreateTokenBlacklistDto } from './create-TokenBlacklist.dto';

export class UpdateTokenBlacklistDto extends PartialType(CreateTokenBlacklistDto) {}
