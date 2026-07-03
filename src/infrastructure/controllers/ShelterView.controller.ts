import { Controller, Get, Param, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ShelterViewUseCase } from '../../application/use-cases/ShelterView.use-case';
import { ShelterViewTypeOrmRepository } from '../persistence/ShelterView.typeorm.repository';

@ApiTags('vw-shelters')
@Controller('views/shelters')
export class ShelterViewController {
  private readonly useCase: ShelterViewUseCase;

  constructor(private readonly repo: ShelterViewTypeOrmRepository) {
    this.useCase = new ShelterViewUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar vw_shelters' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener vw_shelters por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }
}
