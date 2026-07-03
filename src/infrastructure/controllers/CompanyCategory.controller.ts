import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyCategoryUseCase } from '../../application/use-cases/CompanyCategory.use-case';
import { CompanyCategoryTypeOrmRepository } from '../persistence/CompanyCategory.typeorm.repository';
import { CreateCompanyCategoryDto } from '../../dto/create-CompanyCategory.dto';
import { UpdateCompanyCategoryDto } from '../../dto/update-CompanyCategory.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('company-categories')
@Controller('company-categories')
export class CompanyCategoryController {
  private readonly useCase: CompanyCategoryUseCase;

  constructor(private readonly repo: CompanyCategoryTypeOrmRepository) {
    this.useCase = new CompanyCategoryUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar company_categories' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener company_categories por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear company_categories' })
  create(@Body() dto: CreateCompanyCategoryDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar company_categories' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCompanyCategoryDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Activar/desactivar company_categories' })
  @ApiParam({ name: 'id', type: String })
  setActive(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1);
  }
}
