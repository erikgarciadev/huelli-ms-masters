import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyProfileUseCase } from '../../application/use-cases/CompanyProfile.use-case';
import { CompanyProfileTypeOrmRepository } from '../persistence/CompanyProfile.typeorm.repository';
import { CreateCompanyProfileDto } from '../../dto/create-CompanyProfile.dto';
import { UpdateCompanyProfileDto } from '../../dto/update-CompanyProfile.dto';

@ApiTags('company-profiles')
@Controller('company-profiles')
export class CompanyProfileController {
  private readonly useCase: CompanyProfileUseCase;

  constructor(private readonly repo: CompanyProfileTypeOrmRepository) {
    this.useCase = new CompanyProfileUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar company_profiles' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener company_profiles por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear company_profiles' })
  create(@Body() dto: CreateCompanyProfileDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar company_profiles' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCompanyProfileDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar (soft delete) company_profiles' })
  @ApiParam({ name: 'id', type: String })
  async softDelete(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.softDelete(id);
  }
}
