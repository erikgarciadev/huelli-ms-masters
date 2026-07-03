import { Controller, Get, Param, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RescuerViewUseCase } from '../../application/use-cases/RescuerView.use-case';
import { RescuerViewTypeOrmRepository } from '../persistence/RescuerView.typeorm.repository';

@ApiTags('vw-rescuers')
@Controller('views/rescuers')
export class RescuerViewController {
  private readonly useCase: RescuerViewUseCase;

  constructor(private readonly repo: RescuerViewTypeOrmRepository) {
    this.useCase = new RescuerViewUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar vw_rescuers' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener vw_rescuers por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }
}
