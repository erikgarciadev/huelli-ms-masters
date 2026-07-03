import { Controller, Get, Param, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ActiveSessionViewUseCase } from '../../application/use-cases/ActiveSessionView.use-case';
import { ActiveSessionViewTypeOrmRepository } from '../persistence/ActiveSessionView.typeorm.repository';

@ApiTags('vw-active-sessions')
@Controller('views/active-sessions')
export class ActiveSessionViewController {
  private readonly useCase: ActiveSessionViewUseCase;

  constructor(private readonly repo: ActiveSessionViewTypeOrmRepository) {
    this.useCase = new ActiveSessionViewUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar vw_active_sessions' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener vw_active_sessions por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }
}
