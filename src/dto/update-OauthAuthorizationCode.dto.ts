import { PartialType } from '@nestjs/swagger';
import { CreateOauthAuthorizationCodeDto } from './create-OauthAuthorizationCode.dto';

export class UpdateOauthAuthorizationCodeDto extends PartialType(CreateOauthAuthorizationCodeDto) {}
