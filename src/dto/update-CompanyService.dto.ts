import { PartialType } from '@nestjs/swagger';
import { CreateCompanyServiceDto } from './create-CompanyService.dto';

export class UpdateCompanyServiceDto extends PartialType(CreateCompanyServiceDto) {}
