import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyReviewUseCase } from '../../application/use-cases/CompanyReview.use-case';
import { CompanyReviewTypeOrmRepository } from '../persistence/CompanyReview.typeorm.repository';
import { CreateCompanyReviewDto } from '../../dto/create-CompanyReview.dto';
import { UpdateCompanyReviewDto } from '../../dto/update-CompanyReview.dto';

@ApiTags('company-reviews')
@Controller('company-reviews')
export class CompanyReviewController {
  private readonly useCase: CompanyReviewUseCase;

  constructor(private readonly repo: CompanyReviewTypeOrmRepository) {
    this.useCase = new CompanyReviewUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar company_reviews' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener company_reviews por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear company_reviews' })
  create(@Body() dto: CreateCompanyReviewDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar company_reviews' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCompanyReviewDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar company_reviews' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
