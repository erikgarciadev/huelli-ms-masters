import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVerificationTokenDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  token?: string;

  @ApiProperty()
  @IsNotEmpty() @IsDateString()
  expires_at!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  used_at?: string;

}
