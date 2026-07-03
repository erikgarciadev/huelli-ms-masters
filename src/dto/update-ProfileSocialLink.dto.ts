import { PartialType } from '@nestjs/swagger';
import { CreateProfileSocialLinkDto } from './create-ProfileSocialLink.dto';

export class UpdateProfileSocialLinkDto extends PartialType(CreateProfileSocialLinkDto) {}
