import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProfileSocialLinkUseCase } from '../../application/use-cases/ProfileSocialLink.use-case';
import { ProfileSocialLinkTypeOrmRepository } from '../persistence/ProfileSocialLink.typeorm.repository';
import { CreateProfileSocialLinkDto } from '../../dto/create-ProfileSocialLink.dto';
import { UpdateProfileSocialLinkDto } from '../../dto/update-ProfileSocialLink.dto';

@ApiTags('profile-social-links')
@Controller('profile-social-links')
export class ProfileSocialLinkController {
  private readonly useCase: ProfileSocialLinkUseCase;

  constructor(private readonly repo: ProfileSocialLinkTypeOrmRepository) {
    this.useCase = new ProfileSocialLinkUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar profile_social_links' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener profile_social_links por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear profile_social_links' })
  create(@Body() dto: CreateProfileSocialLinkDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar profile_social_links' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProfileSocialLinkDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar profile_social_links' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
