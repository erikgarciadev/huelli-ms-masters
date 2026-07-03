import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyBusinessHourDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  company_location_id!: string;

  @ApiProperty()
  @IsInt()
  day_of_week!: number;

  @ApiProperty()
  @IsNotEmpty() @IsString()
  open_time!: string;

  @ApiProperty()
  @IsNotEmpty() @IsString()
  close_time!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_closed?: boolean;

}
