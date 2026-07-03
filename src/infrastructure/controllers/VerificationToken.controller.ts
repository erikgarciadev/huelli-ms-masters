import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { VerificationTokenUseCase } from '../../application/use-cases/VerificationToken.use-case';
import { VerificationTokenTypeOrmRepository } from '../persistence/VerificationToken.typeorm.repository';
import { CreateVerificationTokenDto } from '../../dto/create-VerificationToken.dto';
import { UpdateVerificationTokenDto } from '../../dto/update-VerificationToken.dto';

@ApiTags('verification-tokens')
@Controller('verification-tokens')
export class VerificationTokenController {
  private readonly useCase: VerificationTokenUseCase;

  constructor(private readonly repo: VerificationTokenTypeOrmRepository) {
    this.useCase = new VerificationTokenUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar verification_tokens' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener verification_tokens por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear verification_tokens' })
  create(@Body() dto: CreateVerificationTokenDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar verification_tokens' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateVerificationTokenDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar verification_tokens' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
