import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyServiceUseCase } from '../../application/use-cases/CompanyService.use-case';
import { CompanyServiceTypeOrmRepository } from '../persistence/CompanyService.typeorm.repository';
import { CreateCompanyServiceDto } from '../../dto/create-CompanyService.dto';
import { UpdateCompanyServiceDto } from '../../dto/update-CompanyService.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('company-services')
@Controller('company-services')
export class CompanyServiceController {
  private readonly useCase: CompanyServiceUseCase;

  constructor(private readonly repo: CompanyServiceTypeOrmRepository) {
    this.useCase = new CompanyServiceUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar company_services' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener company_services por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear company_services' })
  create(@Body() dto: CreateCompanyServiceDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar company_services' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCompanyServiceDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Activar/desactivar company_services' })
  @ApiParam({ name: 'id', type: String })
  setActive(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1);
  }
}
