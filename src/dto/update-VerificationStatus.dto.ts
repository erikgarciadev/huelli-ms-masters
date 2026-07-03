import { PartialType } from '@nestjs/swagger';
import { CreateVerificationStatusDto } from './create-VerificationStatus.dto';

export class UpdateVerificationStatusDto extends PartialType(CreateVerificationStatusDto) {}
