import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { WorkExperienceModule } from './work-experience/work-experience.module';
import { SavedJobsModule } from './saved-jobs/saved-jobs.module';
import { JobsNotificationsModule } from './jobs-notifications/jobs-notifications.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_NAME"),
        entities: [__dirname + "dist/**/*.entity{.ts,.js}"],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
    JobApplicationsModule,
    WorkExperienceModule,
    SavedJobsModule,
    JobsNotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
