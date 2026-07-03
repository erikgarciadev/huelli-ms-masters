import { PartialType } from '@nestjs/swagger';
import { CreateLoginAuditDto } from './create-LoginAudit.dto';

export class UpdateLoginAuditDto extends PartialType(CreateLoginAuditDto) {}
