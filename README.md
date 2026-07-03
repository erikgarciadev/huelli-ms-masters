# ms-bs-huelli

> Generado por **Jarvis Platform** a partir del esquema de `huelli_db` (2026-07-03)

## Estrategia
Microservicio de mantenimiento (CRUD) — replica la arquitectura hexagonal de `ms-bs-catalogs`, adaptada a PostgreSQL.

## Stack Tecnológico
- **Runtime**: Node.js 20 + TypeScript
- **Framework**: NestJS 11
- **Arquitectura**: hexagonal (domain / application / infrastructure)
- **ORM**: TypeORM (driver `pg`)
- **Base de datos**: PostgreSQL (`huelli_db`, esquema `public`)
- **Auth**: none (a nivel de este ms; se asume gateway/BFF delante)
- **API Docs**: Swagger UI (`/api/docs`)

## Convención de mantenimiento por tabla
- Tablas con columna `is_active`: `GET / :id`, `POST`, `PUT :id`, `PATCH :id/estado` (activar/desactivar).
- Tablas con columna `deleted_at`: `GET / :id`, `POST`, `PUT :id`, `DELETE :id` (soft delete, marca `deleted_at`).
- Resto de tablas (sin bandera de estado): `GET / :id`, `POST`, `PUT :id`, `DELETE :id` (delete físico).
- Vistas SQL (`vw_*`): solo lectura, `GET / :id` (no admiten create/update/delete).

## Endpoints

### ApiToken (`api_tokens`)
- `GET    /api-tokens` — Listar
- `GET    /api-tokens/:id` — Obtener
- `POST   /api-tokens` — Crear
- `PUT    /api-tokens/:id` — Actualizar
- `DELETE /api-tokens/:id` — Eliminar

### AuthProvider (`auth_providers`)
- `GET    /auth-providers` — Listar
- `GET    /auth-providers/:id` — Obtener
- `POST   /auth-providers` — Crear
- `PUT    /auth-providers/:id` — Actualizar
- `PATCH  /auth-providers/:id/estado` — Activar/desactivar

### CompanyBusinessHour (`company_business_hours`)
- `GET    /company-business-hours` — Listar
- `GET    /company-business-hours/:id` — Obtener
- `POST   /company-business-hours` — Crear
- `PUT    /company-business-hours/:id` — Actualizar
- `DELETE /company-business-hours/:id` — Eliminar

### CompanyCategory (`company_categories`)
- `GET    /company-categories` — Listar
- `GET    /company-categories/:id` — Obtener
- `POST   /company-categories` — Crear
- `PUT    /company-categories/:id` — Actualizar
- `PATCH  /company-categories/:id/estado` — Activar/desactivar

### CompanyContact (`company_contacts`)
- `GET    /company-contacts` — Listar
- `GET    /company-contacts/:id` — Obtener
- `POST   /company-contacts` — Crear
- `PUT    /company-contacts/:id` — Actualizar
- `DELETE /company-contacts/:id` — Eliminar

### CompanyGallery (`company_gallery`)
- `GET    /company-galleries` — Listar
- `GET    /company-galleries/:id` — Obtener
- `POST   /company-galleries` — Crear
- `PUT    /company-galleries/:id` — Actualizar
- `DELETE /company-galleries/:id` — Eliminar

### CompanyLocation (`company_locations`)
- `GET    /company-locations` — Listar
- `GET    /company-locations/:id` — Obtener
- `POST   /company-locations` — Crear
- `PUT    /company-locations/:id` — Actualizar
- `DELETE /company-locations/:id` — Eliminar

### CompanyProfile (`company_profiles`)
- `GET    /company-profiles` — Listar
- `GET    /company-profiles/:id` — Obtener
- `POST   /company-profiles` — Crear
- `PUT    /company-profiles/:id` — Actualizar
- `DELETE /company-profiles/:id` — Eliminar (soft delete)

### CompanyReview (`company_reviews`)
- `GET    /company-reviews` — Listar
- `GET    /company-reviews/:id` — Obtener
- `POST   /company-reviews` — Crear
- `PUT    /company-reviews/:id` — Actualizar
- `DELETE /company-reviews/:id` — Eliminar

### CompanyService (`company_services`)
- `GET    /company-services` — Listar
- `GET    /company-services/:id` — Obtener
- `POST   /company-services` — Crear
- `PUT    /company-services/:id` — Actualizar
- `PATCH  /company-services/:id/estado` — Activar/desactivar

### Country (`countries`)
- `GET    /countries` — Listar
- `GET    /countries/:id` — Obtener
- `POST   /countries` — Crear
- `PUT    /countries/:id` — Actualizar
- `PATCH  /countries/:id/estado` — Activar/desactivar

### Department (`departments`)
- `GET    /departments` — Listar
- `GET    /departments/:id` — Obtener
- `POST   /departments` — Crear
- `PUT    /departments/:id` — Actualizar
- `PATCH  /departments/:id/estado` — Activar/desactivar

### District (`districts`)
- `GET    /districts` — Listar
- `GET    /districts/:id` — Obtener
- `POST   /districts` — Crear
- `PUT    /districts/:id` — Actualizar
- `PATCH  /districts/:id/estado` — Activar/desactivar

### Identity (`identities`)
- `GET    /identities` — Listar
- `GET    /identities/:id` — Obtener
- `POST   /identities` — Crear
- `PUT    /identities/:id` — Actualizar
- `DELETE /identities/:id` — Eliminar (soft delete)

### LoginAudit (`login_audit`)
- `GET    /login-audits` — Listar
- `GET    /login-audits/:id` — Obtener
- `POST   /login-audits` — Crear
- `PUT    /login-audits/:id` — Actualizar
- `DELETE /login-audits/:id` — Eliminar

### OauthAuthorizationCode (`oauth_authorization_codes`)
- `GET    /oauth-authorization-codes` — Listar
- `GET    /oauth-authorization-codes/:id` — Obtener
- `POST   /oauth-authorization-codes` — Crear
- `PUT    /oauth-authorization-codes/:id` — Actualizar
- `DELETE /oauth-authorization-codes/:id` — Eliminar

### PasswordResetToken (`password_reset_tokens`)
- `GET    /password-reset-tokens` — Listar
- `GET    /password-reset-tokens/:id` — Obtener
- `POST   /password-reset-tokens` — Crear
- `PUT    /password-reset-tokens/:id` — Actualizar
- `DELETE /password-reset-tokens/:id` — Eliminar

### ProfileFavoriteDistrict (`profile_favorite_districts`)
- `GET    /profile-favorite-districts` — Listar
- `GET    /profile-favorite-districts/:id` — Obtener
- `POST   /profile-favorite-districts` — Crear
- `PUT    /profile-favorite-districts/:id` — Actualizar
- `DELETE /profile-favorite-districts/:id` — Eliminar

### ProfileFollower (`profile_followers`)
- `GET    /profile-followers` — Listar
- `GET    /profile-followers/:id` — Obtener
- `POST   /profile-followers` — Crear
- `PUT    /profile-followers/:id` — Actualizar
- `DELETE /profile-followers/:id` — Eliminar

### ProfilePhone (`profile_phones`)
- `GET    /profile-phones` — Listar
- `GET    /profile-phones/:id` — Obtener
- `POST   /profile-phones` — Crear
- `PUT    /profile-phones/:id` — Actualizar
- `DELETE /profile-phones/:id` — Eliminar

### ProfilePreference (`profile_preferences`)
- `GET    /profile-preferences` — Listar
- `GET    /profile-preferences/:id` — Obtener
- `POST   /profile-preferences` — Crear
- `PUT    /profile-preferences/:id` — Actualizar
- `DELETE /profile-preferences/:id` — Eliminar

### ProfileSocialLink (`profile_social_links`)
- `GET    /profile-social-links` — Listar
- `GET    /profile-social-links/:id` — Obtener
- `POST   /profile-social-links` — Crear
- `PUT    /profile-social-links/:id` — Actualizar
- `DELETE /profile-social-links/:id` — Eliminar

### PushToken (`push_tokens`)
- `GET    /push-tokens` — Listar
- `GET    /push-tokens/:id` — Obtener
- `POST   /push-tokens` — Crear
- `PUT    /push-tokens/:id` — Actualizar
- `PATCH  /push-tokens/:id/estado` — Activar/desactivar

### RefreshToken (`refresh_tokens`)
- `GET    /refresh-tokens` — Listar
- `GET    /refresh-tokens/:id` — Obtener
- `POST   /refresh-tokens` — Crear
- `PUT    /refresh-tokens/:id` — Actualizar
- `DELETE /refresh-tokens/:id` — Eliminar

### RescuerProfile (`rescuer_profiles`)
- `GET    /rescuer-profiles` — Listar
- `GET    /rescuer-profiles/:id` — Obtener
- `POST   /rescuer-profiles` — Crear
- `PUT    /rescuer-profiles/:id` — Actualizar
- `DELETE /rescuer-profiles/:id` — Eliminar

### Role (`roles`)
- `GET    /roles` — Listar
- `GET    /roles/:id` — Obtener
- `POST   /roles` — Crear
- `PUT    /roles/:id` — Actualizar
- `PATCH  /roles/:id/estado` — Activar/desactivar

### SessionToken (`session_tokens`)
- `GET    /session-tokens` — Listar
- `GET    /session-tokens/:id` — Obtener
- `POST   /session-tokens` — Crear
- `PUT    /session-tokens/:id` — Actualizar
- `DELETE /session-tokens/:id` — Eliminar

### ShelterProfile (`shelter_profiles`)
- `GET    /shelter-profiles` — Listar
- `GET    /shelter-profiles/:id` — Obtener
- `POST   /shelter-profiles` — Crear
- `PUT    /shelter-profiles/:id` — Actualizar
- `DELETE /shelter-profiles/:id` — Eliminar

### TokenBlacklist (`token_blacklist`)
- `GET    /token-blacklists` — Listar
- `GET    /token-blacklists/:id` — Obtener
- `POST   /token-blacklists` — Crear
- `PUT    /token-blacklists/:id` — Actualizar
- `DELETE /token-blacklists/:id` — Eliminar

### UserDevice (`user_devices`)
- `GET    /user-devices` — Listar
- `GET    /user-devices/:id` — Obtener
- `POST   /user-devices` — Crear
- `PUT    /user-devices/:id` — Actualizar
- `DELETE /user-devices/:id` — Eliminar

### UserProfile (`user_profiles`)
- `GET    /user-profiles` — Listar
- `GET    /user-profiles/:id` — Obtener
- `POST   /user-profiles` — Crear
- `PUT    /user-profiles/:id` — Actualizar
- `DELETE /user-profiles/:id` — Eliminar (soft delete)

### UserStatus (`user_status`)
- `GET    /user-statuses` — Listar
- `GET    /user-statuses/:id` — Obtener
- `POST   /user-statuses` — Crear
- `PUT    /user-statuses/:id` — Actualizar
- `DELETE /user-statuses/:id` — Eliminar

### User (`users`)
- `GET    /users` — Listar
- `GET    /users/:id` — Obtener
- `POST   /users` — Crear
- `PUT    /users/:id` — Actualizar
- `DELETE /users/:id` — Eliminar (soft delete)

### VerificationStatus (`verification_status`)
- `GET    /verification-statuses` — Listar
- `GET    /verification-statuses/:id` — Obtener
- `POST   /verification-statuses` — Crear
- `PUT    /verification-statuses/:id` — Actualizar
- `DELETE /verification-statuses/:id` — Eliminar

### VerificationToken (`verification_tokens`)
- `GET    /verification-tokens` — Listar
- `GET    /verification-tokens/:id` — Obtener
- `POST   /verification-tokens` — Crear
- `PUT    /verification-tokens/:id` — Actualizar
- `DELETE /verification-tokens/:id` — Eliminar

### ActiveSessionView (`vw_active_sessions`)
- `GET    /views/active-sessions` — Listar
- `GET    /views/active-sessions/:id` — Obtener

### CompanyView (`vw_companies`)
- `GET    /views/companies` — Listar
- `GET    /views/companies/:id` — Obtener

### CompanyLocationView (`vw_company_locations`)
- `GET    /views/company-locations` — Listar
- `GET    /views/company-locations/:id` — Obtener

### LoginAuditView (`vw_login_audit`)
- `GET    /views/login-audits` — Listar
- `GET    /views/login-audits/:id` — Obtener

### PublicProfileView (`vw_public_profiles`)
- `GET    /views/public-profiles` — Listar
- `GET    /views/public-profiles/:id` — Obtener

### RescuerView (`vw_rescuers`)
- `GET    /views/rescuers` — Listar
- `GET    /views/rescuers/:id` — Obtener

### ShelterView (`vw_shelters`)
- `GET    /views/shelters` — Listar
- `GET    /views/shelters/:id` — Obtener

## Instalación

```bash
npm install
cp .env.example .env
# Editar .env con tus valores reales (host/puerto de huelli-postgres, etc.)
npm run start:dev
```

## Docker

```bash
docker build -t ms-bs-huelli .
docker run -p 10420:10420 --env-file .env ms-bs-huelli
```

Para que este contenedor alcance `huelli-postgres`, conéctalo a la red `huelli-network` (creada por huelli_database/docker-compose.yml) y usa `DB_HOST=huelli-postgres`.

## Swagger UI

Disponible en: `http://localhost:10420/api/docs`
