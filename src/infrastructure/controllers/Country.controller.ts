import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CountryUseCase } from '../../application/use-cases/Country.use-case';
import { CountryTypeOrmRepository } from '../persistence/Country.typeorm.repository';
import { CreateCountryDto } from '../../dto/create-Country.dto';
import { UpdateCountryDto } from '../../dto/update-Country.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('countries')
@Controller('countries')
export class CountryController {
  private readonly useCase: CountryUseCase;

  constructor(private readonly repo: CountryTypeOrmRepository) {
    this.useCase = new CountryUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar countries' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener countries por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear countries' })
  create(@Body() dto: CreateCountryDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar countries' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCountryDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Activar/desactivar countries' })
  @ApiParam({ name: 'id', type: String })
  setActive(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1);
  }
}
