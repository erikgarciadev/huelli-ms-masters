import { PartialType } from '@nestjs/swagger';
import { CreateCompanyProfileDto } from './create-CompanyProfile.dto';

export class UpdateCompanyProfileDto extends PartialType(CreateCompanyProfileDto) {}
