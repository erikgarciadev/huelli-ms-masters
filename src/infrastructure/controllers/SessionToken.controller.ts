import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SessionTokenUseCase } from '../../application/use-cases/SessionToken.use-case';
import { SessionTokenTypeOrmRepository } from '../persistence/SessionToken.typeorm.repository';
import { CreateSessionTokenDto } from '../../dto/create-SessionToken.dto';
import { UpdateSessionTokenDto } from '../../dto/update-SessionToken.dto';

@ApiTags('session-tokens')
@Controller('session-tokens')
export class SessionTokenController {
  private readonly useCase: SessionTokenUseCase;

  constructor(private readonly repo: SessionTokenTypeOrmRepository) {
    this.useCase = new SessionTokenUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar session_tokens' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener session_tokens por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear session_tokens' })
  create(@Body() dto: CreateSessionTokenDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar session_tokens' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateSessionTokenDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar session_tokens' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
