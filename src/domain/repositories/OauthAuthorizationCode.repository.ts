import { OauthAuthorizationCode } from '../entities/OauthAuthorizationCode.entity';

export interface OauthAuthorizationCodeRepository {
  findAll(): Promise<OauthAuthorizationCode[]>;
  findById(id: string): Promise<OauthAuthorizationCode | null>;
  save(entity: Partial<OauthAuthorizationCode>): Promise<OauthAuthorizationCode>;
  delete(id: string): Promise<void>;
}
