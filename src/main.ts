import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { parseCorsWhitelist } from './common/utils/parse-cors-whitelist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  const corsWhiteList = parseCorsWhitelist(process.env.CORS_WHITELIST ?? '');

  app.enableCors({
    origin: (
      origin: string | undefined, // Isso é do navegador e para proteger o cliente
      callback: (...args: any[]) => void,
    ) => {
      // Requisição sem origin ou que inclui uma origem conhecida
      // por corsWhiteList é permitida
      if (!origin || corsWhiteList.includes(origin)) {
        return callback(null, true); // Permitido
      }

      // Requisições com origin mas que não conhecemos
      // negamos.
      return callback(new Error('Não habilitado para CORS'), false);
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: false,
    }),
  );

  await app.listen(process.env.APP_PORT ?? 3001);
}
void bootstrap();
