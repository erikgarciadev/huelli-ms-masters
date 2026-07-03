import { PartialType } from '@nestjs/swagger';
import { CreateIdentityDto } from './create-Identity.dto';

export class UpdateIdentityDto extends PartialType(CreateIdentityDto) {}
