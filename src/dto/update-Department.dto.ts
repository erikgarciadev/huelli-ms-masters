import { PartialType } from '@nestjs/swagger';
import { CreateDepartmentDto } from './create-Department.dto';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}
