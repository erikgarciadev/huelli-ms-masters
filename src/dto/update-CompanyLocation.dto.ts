import { PartialType } from '@nestjs/swagger';
import { CreateCompanyLocationDto } from './create-CompanyLocation.dto';

export class UpdateCompanyLocationDto extends PartialType(CreateCompanyLocationDto) {}
