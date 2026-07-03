import { PartialType } from '@nestjs/swagger';
import { CreateCompanyReviewDto } from './create-CompanyReview.dto';

export class UpdateCompanyReviewDto extends PartialType(CreateCompanyReviewDto) {}
