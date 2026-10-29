require('reflect-metadata');

const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.APP_PORT || 3000);
  await app.listen(port);
}

bootstrap().catch((error) => {
  console.error('Failed to start the application:', error);
  process.exitCode = 1;
});
