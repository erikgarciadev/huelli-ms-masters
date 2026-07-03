import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyGalleryUseCase } from '../../application/use-cases/CompanyGallery.use-case';
import { CompanyGalleryTypeOrmRepository } from '../persistence/CompanyGallery.typeorm.repository';
import { CreateCompanyGalleryDto } from '../../dto/create-CompanyGallery.dto';
import { UpdateCompanyGalleryDto } from '../../dto/update-CompanyGallery.dto';

@ApiTags('company-gallery')
@Controller('company-galleries')
export class CompanyGalleryController {
  private readonly useCase: CompanyGalleryUseCase;

  constructor(private readonly repo: CompanyGalleryTypeOrmRepository) {
    this.useCase = new CompanyGalleryUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar company_gallery' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener company_gallery por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear company_gallery' })
  create(@Body() dto: CreateCompanyGalleryDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar company_gallery' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCompanyGalleryDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar company_gallery' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
