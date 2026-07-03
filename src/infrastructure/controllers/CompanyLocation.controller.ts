import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyLocationUseCase } from '../../application/use-cases/CompanyLocation.use-case';
import { CompanyLocationTypeOrmRepository } from '../persistence/CompanyLocation.typeorm.repository';
import { CreateCompanyLocationDto } from '../../dto/create-CompanyLocation.dto';
import { UpdateCompanyLocationDto } from '../../dto/update-CompanyLocation.dto';

@ApiTags('company-locations')
@Controller('company-locations')
export class CompanyLocationController {
  private readonly useCase: CompanyLocationUseCase;

  constructor(private readonly repo: CompanyLocationTypeOrmRepository) {
    this.useCase = new CompanyLocationUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar company_locations' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener company_locations por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear company_locations' })
  create(@Body() dto: CreateCompanyLocationDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar company_locations' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCompanyLocationDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar company_locations' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
