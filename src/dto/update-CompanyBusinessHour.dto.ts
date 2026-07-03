import { PartialType } from '@nestjs/swagger';
import { CreateCompanyBusinessHourDto } from './create-CompanyBusinessHour.dto';

export class UpdateCompanyBusinessHourDto extends PartialType(CreateCompanyBusinessHourDto) {}
