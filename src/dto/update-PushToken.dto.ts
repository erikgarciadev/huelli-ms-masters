import { PartialType } from '@nestjs/swagger';
import { CreatePushTokenDto } from './create-PushToken.dto';

export class UpdatePushTokenDto extends PartialType(CreatePushTokenDto) {}
