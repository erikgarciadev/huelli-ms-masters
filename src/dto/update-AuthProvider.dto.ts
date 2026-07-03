import { PartialType } from '@nestjs/swagger';
import { CreateAuthProviderDto } from './create-AuthProvider.dto';

export class UpdateAuthProviderDto extends PartialType(CreateAuthProviderDto) {}
