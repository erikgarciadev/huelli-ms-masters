import { Controller, Get, Param, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PublicProfileViewUseCase } from '../../application/use-cases/PublicProfileView.use-case';
import { PublicProfileViewTypeOrmRepository } from '../persistence/PublicProfileView.typeorm.repository';

@ApiTags('vw-public-profiles')
@Controller('views/public-profiles')
export class PublicProfileViewController {
  private readonly useCase: PublicProfileViewUseCase;

  constructor(private readonly repo: PublicProfileViewTypeOrmRepository) {
    this.useCase = new PublicProfileViewUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar vw_public_profiles' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener vw_public_profiles por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }
}
