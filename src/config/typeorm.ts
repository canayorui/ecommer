import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.development' });

// Validar variables críticas
if (
  !process.env.DB_USERNAME ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_NAME
) {
  throw new Error(
    'Missing required database environment variables: DB_USERNAME, DB_PASSWORD, DB_NAME',
  );
}

const config = {
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  dropSchema: false,
  JWT_SECRET: process.env.JWT_SECRET,
};

export const typeOrmConfig = registerAs('typeorm', () => config);
