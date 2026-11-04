import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './app.properties';
import { AuthModule } from './reto-swapi/infrastructure/module/auth.module';
import { AuthController } from './reto-swapi/infrastructure/controllers/auth.controller';
import { StarwarsController } from './reto-swapi/infrastructure/controllers/starwars.controller';
import { StarwarsModule } from './reto-swapi/infrastructure/module/starwars.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    AuthModule,
    StarwarsModule
  ],
  controllers: [AuthController, StarwarsController]
})
export class AppModule { }