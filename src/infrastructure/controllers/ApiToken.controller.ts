import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiTokenUseCase } from '../../application/use-cases/ApiToken.use-case';
import { ApiTokenTypeOrmRepository } from '../persistence/ApiToken.typeorm.repository';
import { CreateApiTokenDto } from '../../dto/create-ApiToken.dto';
import { UpdateApiTokenDto } from '../../dto/update-ApiToken.dto';

@ApiTags('api-tokens')
@Controller('api-tokens')
export class ApiTokenController {
  private readonly useCase: ApiTokenUseCase;

  constructor(private readonly repo: ApiTokenTypeOrmRepository) {
    this.useCase = new ApiTokenUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar api_tokens' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener api_tokens por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear api_tokens' })
  create(@Body() dto: CreateApiTokenDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar api_tokens' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateApiTokenDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar api_tokens' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
