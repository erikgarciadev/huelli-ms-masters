import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { OauthAuthorizationCodeUseCase } from '../../application/use-cases/OauthAuthorizationCode.use-case';
import { OauthAuthorizationCodeTypeOrmRepository } from '../persistence/OauthAuthorizationCode.typeorm.repository';
import { CreateOauthAuthorizationCodeDto } from '../../dto/create-OauthAuthorizationCode.dto';
import { UpdateOauthAuthorizationCodeDto } from '../../dto/update-OauthAuthorizationCode.dto';

@ApiTags('oauth-authorization-codes')
@Controller('oauth-authorization-codes')
export class OauthAuthorizationCodeController {
  private readonly useCase: OauthAuthorizationCodeUseCase;

  constructor(private readonly repo: OauthAuthorizationCodeTypeOrmRepository) {
    this.useCase = new OauthAuthorizationCodeUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar oauth_authorization_codes' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener oauth_authorization_codes por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear oauth_authorization_codes' })
  create(@Body() dto: CreateOauthAuthorizationCodeDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar oauth_authorization_codes' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateOauthAuthorizationCodeDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar oauth_authorization_codes' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
