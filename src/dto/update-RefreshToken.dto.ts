import { PartialType } from '@nestjs/swagger';
import { CreateRefreshTokenDto } from './create-RefreshToken.dto';

export class UpdateRefreshTokenDto extends PartialType(CreateRefreshTokenDto) {}
