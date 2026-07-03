import { PartialType } from '@nestjs/swagger';
import { CreateProfileFavoriteDistrictDto } from './create-ProfileFavoriteDistrict.dto';

export class UpdateProfileFavoriteDistrictDto extends PartialType(CreateProfileFavoriteDistrictDto) {}
