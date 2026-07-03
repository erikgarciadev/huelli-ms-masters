import { OauthAuthorizationCode } from '../../domain/entities/OauthAuthorizationCode.entity';
import { OauthAuthorizationCodeRepository } from '../../domain/repositories/OauthAuthorizationCode.repository';

export class OauthAuthorizationCodeUseCase {
  constructor(private readonly repo: OauthAuthorizationCodeRepository) {}

  findAll(): Promise<OauthAuthorizationCode[]> { return this.repo.findAll(); }
  findById(id: string): Promise<OauthAuthorizationCode | null> { return this.repo.findById(id); }
  create(data: Partial<OauthAuthorizationCode>): Promise<OauthAuthorizationCode> { return this.repo.save(data); }
  update(id: string, data: Partial<OauthAuthorizationCode>): Promise<OauthAuthorizationCode> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
