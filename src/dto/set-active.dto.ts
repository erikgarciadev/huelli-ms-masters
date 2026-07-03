import { IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// Cambio de estado genérico — reemplaza el delete físico en las tablas con columna is_active.
export class SetActiveDto {
  @ApiProperty({ enum: [0, 1], description: '1 = activo, 0 = inactivo' })
  @Type(() => Number)
  @IsIn([0, 1])
  is_active!: number;
}
