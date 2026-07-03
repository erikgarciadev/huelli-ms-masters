import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { OauthAuthorizationCode } from '../../domain/entities/OauthAuthorizationCode.entity';
import { OauthAuthorizationCodeRepository } from '../../domain/repositories/OauthAuthorizationCode.repository';

@Injectable()
export class OauthAuthorizationCodeTypeOrmRepository implements OauthAuthorizationCodeRepository {
  constructor(
    @InjectRepository(OauthAuthorizationCode)
    private readonly repo: Repository<OauthAuthorizationCode>,
  ) {}

  findAll(): Promise<OauthAuthorizationCode[]> { return this.repo.find(); }
  findById(id: string): Promise<OauthAuthorizationCode | null> {
    return this.repo.findOne({ where: { id: id } as any });
  }
  save(entity: Partial<OauthAuthorizationCode>): Promise<OauthAuthorizationCode> { return this.repo.save(entity as OauthAuthorizationCode); }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
