import { PartialType } from '@nestjs/swagger';
import { CreateProfilePhoneDto } from './create-ProfilePhone.dto';

export class UpdateProfilePhoneDto extends PartialType(CreateProfilePhoneDto) {}
