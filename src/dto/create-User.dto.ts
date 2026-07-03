import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  role_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  status_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsString()
  primary_email!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  email_verified?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  last_login_at?: string;

}
