import { PartialType } from '@nestjs/swagger';
import { CreateApiTokenDto } from './create-ApiToken.dto';

export class UpdateApiTokenDto extends PartialType(CreateApiTokenDto) {}
