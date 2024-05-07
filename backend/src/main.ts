import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { GetUserInterceptor } from './common/interceptors/GetUser.interceptor';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Kullanıcı ve Görev Yönetimi API')
    .setDescription('API dokümantasyonu')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'Header',
      name:"access_token"
    })
    .build();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true,
      disableErrorMessages: false,
      validationError: { target: false } 
    }));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document,);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
  

  
