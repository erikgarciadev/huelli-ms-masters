import { PartialType } from '@nestjs/swagger';
import { CreateVerificationTokenDto } from './create-VerificationToken.dto';

export class UpdateVerificationTokenDto extends PartialType(CreateVerificationTokenDto) {}
