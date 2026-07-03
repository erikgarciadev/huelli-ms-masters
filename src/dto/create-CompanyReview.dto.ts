import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyReviewDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  company_profile_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiProperty()
  @IsInt()
  rating!: number;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  comment?: string;

}
