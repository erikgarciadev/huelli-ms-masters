import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { VerificationStatusUseCase } from '../../application/use-cases/VerificationStatus.use-case';
import { VerificationStatusTypeOrmRepository } from '../persistence/VerificationStatus.typeorm.repository';
import { CreateVerificationStatusDto } from '../../dto/create-VerificationStatus.dto';
import { UpdateVerificationStatusDto } from '../../dto/update-VerificationStatus.dto';

@ApiTags('verification-status')
@Controller('verification-statuses')
export class VerificationStatusController {
  private readonly useCase: VerificationStatusUseCase;

  constructor(private readonly repo: VerificationStatusTypeOrmRepository) {
    this.useCase = new VerificationStatusUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar verification_status' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener verification_status por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear verification_status' })
  create(@Body() dto: CreateVerificationStatusDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar verification_status' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateVerificationStatusDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar verification_status' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
