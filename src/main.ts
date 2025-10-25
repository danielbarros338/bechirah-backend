import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import corsConfig from './config/cors/cors.config';
import { AllExceptionsFilter } from './shared/interceptors/AllExceptionsFilter.interceptor';
import { TransformInterceptor } from './shared/interceptors/TransformInterceptor.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>(
    'PORT',
    parseInt(process.env.PORT ?? '3200', 10),
  );

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: corsConfig().origin,
    methods: corsConfig().methods,
    allowedHeaders: corsConfig().allowHeaders,
  });

  const config = new DocumentBuilder()
    .setTitle('API Bechirah')
    .setDescription('API do projeto Bechirah')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      operationsSorter: 'asc',
      tagsSorter: 'asc',
      filter: true,
      showExtensions: true,
    },
  });

  await app.listen(port);

  logger.verbose(`Application runnin on port ${port}`);
}
bootstrap();
