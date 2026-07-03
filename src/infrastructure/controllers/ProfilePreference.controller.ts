import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProfilePreferenceUseCase } from '../../application/use-cases/ProfilePreference.use-case';
import { ProfilePreferenceTypeOrmRepository } from '../persistence/ProfilePreference.typeorm.repository';
import { CreateProfilePreferenceDto } from '../../dto/create-ProfilePreference.dto';
import { UpdateProfilePreferenceDto } from '../../dto/update-ProfilePreference.dto';

@ApiTags('profile-preferences')
@Controller('profile-preferences')
export class ProfilePreferenceController {
  private readonly useCase: ProfilePreferenceUseCase;

  constructor(private readonly repo: ProfilePreferenceTypeOrmRepository) {
    this.useCase = new ProfilePreferenceUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar profile_preferences' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener profile_preferences por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear profile_preferences' })
  create(@Body() dto: CreateProfilePreferenceDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar profile_preferences' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProfilePreferenceDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar profile_preferences' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
