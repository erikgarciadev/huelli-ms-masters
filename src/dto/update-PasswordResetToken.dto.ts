import { PartialType } from '@nestjs/swagger';
import { CreatePasswordResetTokenDto } from './create-PasswordResetToken.dto';

export class UpdatePasswordResetTokenDto extends PartialType(CreatePasswordResetTokenDto) {}
