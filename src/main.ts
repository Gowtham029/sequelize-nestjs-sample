import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

    app.useGlobalFilters(new GlobalExceptionFilter());

    const options = new DocumentBuilder()
        .setTitle("Boiler Plate")
        .setDescription("The Boiler Plate API description")
        .setVersion("1.0")
        .addTag("BoilerPlate")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api-docs", app, document);

    await app.listen(PORT);
}
bootstrap();
