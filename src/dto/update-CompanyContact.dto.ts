import { PartialType } from '@nestjs/swagger';
import { CreateCompanyContactDto } from './create-CompanyContact.dto';

export class UpdateCompanyContactDto extends PartialType(CreateCompanyContactDto) {}
