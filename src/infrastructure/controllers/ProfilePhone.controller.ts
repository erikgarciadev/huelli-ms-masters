import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProfilePhoneUseCase } from '../../application/use-cases/ProfilePhone.use-case';
import { ProfilePhoneTypeOrmRepository } from '../persistence/ProfilePhone.typeorm.repository';
import { CreateProfilePhoneDto } from '../../dto/create-ProfilePhone.dto';
import { UpdateProfilePhoneDto } from '../../dto/update-ProfilePhone.dto';

@ApiTags('profile-phones')
@Controller('profile-phones')
export class ProfilePhoneController {
  private readonly useCase: ProfilePhoneUseCase;

  constructor(private readonly repo: ProfilePhoneTypeOrmRepository) {
    this.useCase = new ProfilePhoneUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar profile_phones' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener profile_phones por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear profile_phones' })
  create(@Body() dto: CreateProfilePhoneDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar profile_phones' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProfilePhoneDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar profile_phones' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
