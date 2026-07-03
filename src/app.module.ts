import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';

import { ApiTokenController } from './infrastructure/controllers/ApiToken.controller';
import { AuthProviderController } from './infrastructure/controllers/AuthProvider.controller';
import { CompanyBusinessHourController } from './infrastructure/controllers/CompanyBusinessHour.controller';
import { CompanyCategoryController } from './infrastructure/controllers/CompanyCategory.controller';
import { CompanyContactController } from './infrastructure/controllers/CompanyContact.controller';
import { CompanyGalleryController } from './infrastructure/controllers/CompanyGallery.controller';
import { CompanyLocationController } from './infrastructure/controllers/CompanyLocation.controller';
import { CompanyProfileController } from './infrastructure/controllers/CompanyProfile.controller';
import { CompanyReviewController } from './infrastructure/controllers/CompanyReview.controller';
import { CompanyServiceController } from './infrastructure/controllers/CompanyService.controller';
import { CountryController } from './infrastructure/controllers/Country.controller';
import { DepartmentController } from './infrastructure/controllers/Department.controller';
import { DistrictController } from './infrastructure/controllers/District.controller';
import { IdentityController } from './infrastructure/controllers/Identity.controller';
import { LoginAuditController } from './infrastructure/controllers/LoginAudit.controller';
import { OauthAuthorizationCodeController } from './infrastructure/controllers/OauthAuthorizationCode.controller';
import { PasswordResetTokenController } from './infrastructure/controllers/PasswordResetToken.controller';
import { ProfileFavoriteDistrictController } from './infrastructure/controllers/ProfileFavoriteDistrict.controller';
import { ProfileFollowerController } from './infrastructure/controllers/ProfileFollower.controller';
import { ProfilePhoneController } from './infrastructure/controllers/ProfilePhone.controller';
import { ProfilePreferenceController } from './infrastructure/controllers/ProfilePreference.controller';
import { ProfileSocialLinkController } from './infrastructure/controllers/ProfileSocialLink.controller';
import { PushTokenController } from './infrastructure/controllers/PushToken.controller';
import { RefreshTokenController } from './infrastructure/controllers/RefreshToken.controller';
import { RescuerProfileController } from './infrastructure/controllers/RescuerProfile.controller';
import { RoleController } from './infrastructure/controllers/Role.controller';
import { SessionTokenController } from './infrastructure/controllers/SessionToken.controller';
import { ShelterProfileController } from './infrastructure/controllers/ShelterProfile.controller';
import { TokenBlacklistController } from './infrastructure/controllers/TokenBlacklist.controller';
import { UserDeviceController } from './infrastructure/controllers/UserDevice.controller';
import { UserProfileController } from './infrastructure/controllers/UserProfile.controller';
import { UserStatusController } from './infrastructure/controllers/UserStatus.controller';
import { UserController } from './infrastructure/controllers/User.controller';
import { VerificationStatusController } from './infrastructure/controllers/VerificationStatus.controller';
import { VerificationTokenController } from './infrastructure/controllers/VerificationToken.controller';
import { ActiveSessionViewController } from './infrastructure/controllers/ActiveSessionView.controller';
import { CompanyViewController } from './infrastructure/controllers/CompanyView.controller';
import { CompanyLocationViewController } from './infrastructure/controllers/CompanyLocationView.controller';
import { LoginAuditViewController } from './infrastructure/controllers/LoginAuditView.controller';
import { PublicProfileViewController } from './infrastructure/controllers/PublicProfileView.controller';
import { RescuerViewController } from './infrastructure/controllers/RescuerView.controller';
import { ShelterViewController } from './infrastructure/controllers/ShelterView.controller';

import { ApiToken } from './domain/entities/ApiToken.entity';
import { AuthProvider } from './domain/entities/AuthProvider.entity';
import { CompanyBusinessHour } from './domain/entities/CompanyBusinessHour.entity';
import { CompanyCategory } from './domain/entities/CompanyCategory.entity';
import { CompanyContact } from './domain/entities/CompanyContact.entity';
import { CompanyGallery } from './domain/entities/CompanyGallery.entity';
import { CompanyLocation } from './domain/entities/CompanyLocation.entity';
import { CompanyProfile } from './domain/entities/CompanyProfile.entity';
import { CompanyReview } from './domain/entities/CompanyReview.entity';
import { CompanyService } from './domain/entities/CompanyService.entity';
import { Country } from './domain/entities/Country.entity';
import { Department } from './domain/entities/Department.entity';
import { District } from './domain/entities/District.entity';
import { Identity } from './domain/entities/Identity.entity';
import { LoginAudit } from './domain/entities/LoginAudit.entity';
import { OauthAuthorizationCode } from './domain/entities/OauthAuthorizationCode.entity';
import { PasswordResetToken } from './domain/entities/PasswordResetToken.entity';
import { ProfileFavoriteDistrict } from './domain/entities/ProfileFavoriteDistrict.entity';
import { ProfileFollower } from './domain/entities/ProfileFollower.entity';
import { ProfilePhone } from './domain/entities/ProfilePhone.entity';
import { ProfilePreference } from './domain/entities/ProfilePreference.entity';
import { ProfileSocialLink } from './domain/entities/ProfileSocialLink.entity';
import { PushToken } from './domain/entities/PushToken.entity';
import { RefreshToken } from './domain/entities/RefreshToken.entity';
import { RescuerProfile } from './domain/entities/RescuerProfile.entity';
import { Role } from './domain/entities/Role.entity';
import { SessionToken } from './domain/entities/SessionToken.entity';
import { ShelterProfile } from './domain/entities/ShelterProfile.entity';
import { TokenBlacklist } from './domain/entities/TokenBlacklist.entity';
import { UserDevice } from './domain/entities/UserDevice.entity';
import { UserProfile } from './domain/entities/UserProfile.entity';
import { UserStatus } from './domain/entities/UserStatus.entity';
import { User } from './domain/entities/User.entity';
import { VerificationStatus } from './domain/entities/VerificationStatus.entity';
import { VerificationToken } from './domain/entities/VerificationToken.entity';
import { ActiveSessionView } from './domain/entities/ActiveSessionView.entity';
import { CompanyView } from './domain/entities/CompanyView.entity';
import { CompanyLocationView } from './domain/entities/CompanyLocationView.entity';
import { LoginAuditView } from './domain/entities/LoginAuditView.entity';
import { PublicProfileView } from './domain/entities/PublicProfileView.entity';
import { RescuerView } from './domain/entities/RescuerView.entity';
import { ShelterView } from './domain/entities/ShelterView.entity';

import { ApiTokenTypeOrmRepository } from './infrastructure/persistence/ApiToken.typeorm.repository';
import { AuthProviderTypeOrmRepository } from './infrastructure/persistence/AuthProvider.typeorm.repository';
import { CompanyBusinessHourTypeOrmRepository } from './infrastructure/persistence/CompanyBusinessHour.typeorm.repository';
import { CompanyCategoryTypeOrmRepository } from './infrastructure/persistence/CompanyCategory.typeorm.repository';
import { CompanyContactTypeOrmRepository } from './infrastructure/persistence/CompanyContact.typeorm.repository';
import { CompanyGalleryTypeOrmRepository } from './infrastructure/persistence/CompanyGallery.typeorm.repository';
import { CompanyLocationTypeOrmRepository } from './infrastructure/persistence/CompanyLocation.typeorm.repository';
import { CompanyProfileTypeOrmRepository } from './infrastructure/persistence/CompanyProfile.typeorm.repository';
import { CompanyReviewTypeOrmRepository } from './infrastructure/persistence/CompanyReview.typeorm.repository';
import { CompanyServiceTypeOrmRepository } from './infrastructure/persistence/CompanyService.typeorm.repository';
import { CountryTypeOrmRepository } from './infrastructure/persistence/Country.typeorm.repository';
import { DepartmentTypeOrmRepository } from './infrastructure/persistence/Department.typeorm.repository';
import { DistrictTypeOrmRepository } from './infrastructure/persistence/District.typeorm.repository';
import { IdentityTypeOrmRepository } from './infrastructure/persistence/Identity.typeorm.repository';
import { LoginAuditTypeOrmRepository } from './infrastructure/persistence/LoginAudit.typeorm.repository';
import { OauthAuthorizationCodeTypeOrmRepository } from './infrastructure/persistence/OauthAuthorizationCode.typeorm.repository';
import { PasswordResetTokenTypeOrmRepository } from './infrastructure/persistence/PasswordResetToken.typeorm.repository';
import { ProfileFavoriteDistrictTypeOrmRepository } from './infrastructure/persistence/ProfileFavoriteDistrict.typeorm.repository';
import { ProfileFollowerTypeOrmRepository } from './infrastructure/persistence/ProfileFollower.typeorm.repository';
import { ProfilePhoneTypeOrmRepository } from './infrastructure/persistence/ProfilePhone.typeorm.repository';
import { ProfilePreferenceTypeOrmRepository } from './infrastructure/persistence/ProfilePreference.typeorm.repository';
import { ProfileSocialLinkTypeOrmRepository } from './infrastructure/persistence/ProfileSocialLink.typeorm.repository';
import { PushTokenTypeOrmRepository } from './infrastructure/persistence/PushToken.typeorm.repository';
import { RefreshTokenTypeOrmRepository } from './infrastructure/persistence/RefreshToken.typeorm.repository';
import { RescuerProfileTypeOrmRepository } from './infrastructure/persistence/RescuerProfile.typeorm.repository';
import { RoleTypeOrmRepository } from './infrastructure/persistence/Role.typeorm.repository';
import { SessionTokenTypeOrmRepository } from './infrastructure/persistence/SessionToken.typeorm.repository';
import { ShelterProfileTypeOrmRepository } from './infrastructure/persistence/ShelterProfile.typeorm.repository';
import { TokenBlacklistTypeOrmRepository } from './infrastructure/persistence/TokenBlacklist.typeorm.repository';
import { UserDeviceTypeOrmRepository } from './infrastructure/persistence/UserDevice.typeorm.repository';
import { UserProfileTypeOrmRepository } from './infrastructure/persistence/UserProfile.typeorm.repository';
import { UserStatusTypeOrmRepository } from './infrastructure/persistence/UserStatus.typeorm.repository';
import { UserTypeOrmRepository } from './infrastructure/persistence/User.typeorm.repository';
import { VerificationStatusTypeOrmRepository } from './infrastructure/persistence/VerificationStatus.typeorm.repository';
import { VerificationTokenTypeOrmRepository } from './infrastructure/persistence/VerificationToken.typeorm.repository';
import { ActiveSessionViewTypeOrmRepository } from './infrastructure/persistence/ActiveSessionView.typeorm.repository';
import { CompanyViewTypeOrmRepository } from './infrastructure/persistence/CompanyView.typeorm.repository';
import { CompanyLocationViewTypeOrmRepository } from './infrastructure/persistence/CompanyLocationView.typeorm.repository';
import { LoginAuditViewTypeOrmRepository } from './infrastructure/persistence/LoginAuditView.typeorm.repository';
import { PublicProfileViewTypeOrmRepository } from './infrastructure/persistence/PublicProfileView.typeorm.repository';
import { RescuerViewTypeOrmRepository } from './infrastructure/persistence/RescuerView.typeorm.repository';
import { ShelterViewTypeOrmRepository } from './infrastructure/persistence/ShelterView.typeorm.repository';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [HealthModule, ConfigModule],
      useFactory: (cfg: ConfigService) => dbConfig(cfg),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
    ApiToken, AuthProvider, CompanyBusinessHour, CompanyCategory,
    CompanyContact, CompanyGallery, CompanyLocation, CompanyProfile,
    CompanyReview, CompanyService, Country, Department,
    District, Identity, LoginAudit, OauthAuthorizationCode,
    PasswordResetToken, ProfileFavoriteDistrict, ProfileFollower, ProfilePhone,
    ProfilePreference, ProfileSocialLink, PushToken, RefreshToken,
    RescuerProfile, Role, SessionToken, ShelterProfile,
    TokenBlacklist, UserDevice, UserProfile, UserStatus,
    User, VerificationStatus, VerificationToken, ActiveSessionView,
    CompanyView, CompanyLocationView, LoginAuditView, PublicProfileView,
    RescuerView, ShelterView,
    ]),
  ],
  controllers: [
    ApiTokenController, AuthProviderController, CompanyBusinessHourController, CompanyCategoryController,
    CompanyContactController, CompanyGalleryController, CompanyLocationController, CompanyProfileController,
    CompanyReviewController, CompanyServiceController, CountryController, DepartmentController,
    DistrictController, IdentityController, LoginAuditController, OauthAuthorizationCodeController,
    PasswordResetTokenController, ProfileFavoriteDistrictController, ProfileFollowerController, ProfilePhoneController,
    ProfilePreferenceController, ProfileSocialLinkController, PushTokenController, RefreshTokenController,
    RescuerProfileController, RoleController, SessionTokenController, ShelterProfileController,
    TokenBlacklistController, UserDeviceController, UserProfileController, UserStatusController,
    UserController, VerificationStatusController, VerificationTokenController, ActiveSessionViewController,
    CompanyViewController, CompanyLocationViewController, LoginAuditViewController, PublicProfileViewController,
    RescuerViewController, ShelterViewController,
  ],
  providers: [
    ApiTokenTypeOrmRepository, AuthProviderTypeOrmRepository, CompanyBusinessHourTypeOrmRepository, CompanyCategoryTypeOrmRepository,
    CompanyContactTypeOrmRepository, CompanyGalleryTypeOrmRepository, CompanyLocationTypeOrmRepository, CompanyProfileTypeOrmRepository,
    CompanyReviewTypeOrmRepository, CompanyServiceTypeOrmRepository, CountryTypeOrmRepository, DepartmentTypeOrmRepository,
    DistrictTypeOrmRepository, IdentityTypeOrmRepository, LoginAuditTypeOrmRepository, OauthAuthorizationCodeTypeOrmRepository,
    PasswordResetTokenTypeOrmRepository, ProfileFavoriteDistrictTypeOrmRepository, ProfileFollowerTypeOrmRepository, ProfilePhoneTypeOrmRepository,
    ProfilePreferenceTypeOrmRepository, ProfileSocialLinkTypeOrmRepository, PushTokenTypeOrmRepository, RefreshTokenTypeOrmRepository,
    RescuerProfileTypeOrmRepository, RoleTypeOrmRepository, SessionTokenTypeOrmRepository, ShelterProfileTypeOrmRepository,
    TokenBlacklistTypeOrmRepository, UserDeviceTypeOrmRepository, UserProfileTypeOrmRepository, UserStatusTypeOrmRepository,
    UserTypeOrmRepository, VerificationStatusTypeOrmRepository, VerificationTokenTypeOrmRepository, ActiveSessionViewTypeOrmRepository,
    CompanyViewTypeOrmRepository, CompanyLocationViewTypeOrmRepository, LoginAuditViewTypeOrmRepository, PublicProfileViewTypeOrmRepository,
    RescuerViewTypeOrmRepository, ShelterViewTypeOrmRepository,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
