import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyBusinessHourUseCase } from '../../application/use-cases/CompanyBusinessHour.use-case';
import { CompanyBusinessHourTypeOrmRepository } from '../persistence/CompanyBusinessHour.typeorm.repository';
import { CreateCompanyBusinessHourDto } from '../../dto/create-CompanyBusinessHour.dto';
import { UpdateCompanyBusinessHourDto } from '../../dto/update-CompanyBusinessHour.dto';

@ApiTags('company-business-hours')
@Controller('company-business-hours')
export class CompanyBusinessHourController {
  private readonly useCase: CompanyBusinessHourUseCase;

  constructor(private readonly repo: CompanyBusinessHourTypeOrmRepository) {
    this.useCase = new CompanyBusinessHourUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar company_business_hours' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener company_business_hours por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear company_business_hours' })
  create(@Body() dto: CreateCompanyBusinessHourDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar company_business_hours' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCompanyBusinessHourDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar company_business_hours' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
