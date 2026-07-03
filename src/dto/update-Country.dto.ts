import { PartialType } from '@nestjs/swagger';
import { CreateCountryDto } from './create-Country.dto';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
