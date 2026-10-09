import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { TasksModule } from './tasks/tasks.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'nestjs-task-management',
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService : ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE')
      })
    }),
    AuthModule
  ],
})
export class AppModule {}
