import { PartialType } from '@nestjs/swagger';
import { CreateSessionTokenDto } from './create-SessionToken.dto';

export class UpdateSessionTokenDto extends PartialType(CreateSessionTokenDto) {}
