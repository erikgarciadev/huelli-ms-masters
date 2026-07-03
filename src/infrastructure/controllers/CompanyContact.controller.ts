import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyContactUseCase } from '../../application/use-cases/CompanyContact.use-case';
import { CompanyContactTypeOrmRepository } from '../persistence/CompanyContact.typeorm.repository';
import { CreateCompanyContactDto } from '../../dto/create-CompanyContact.dto';
import { UpdateCompanyContactDto } from '../../dto/update-CompanyContact.dto';

@ApiTags('company-contacts')
@Controller('company-contacts')
export class CompanyContactController {
  private readonly useCase: CompanyContactUseCase;

  constructor(private readonly repo: CompanyContactTypeOrmRepository) {
    this.useCase = new CompanyContactUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar company_contacts' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener company_contacts por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear company_contacts' })
  create(@Body() dto: CreateCompanyContactDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar company_contacts' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCompanyContactDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar company_contacts' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
