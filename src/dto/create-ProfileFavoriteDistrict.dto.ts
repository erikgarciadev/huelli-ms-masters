import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileFavoriteDistrictDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_profile_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  district_id!: string;

}
