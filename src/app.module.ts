import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { ChatModule } from "./chat/chat.module";
import { CompanyModule } from "./company/company.module";
import { EduModule } from "./edu/edu.module";
import { EmployersModule } from "./employers/employers.module";
import { JobApplicationsModule } from "./job-applications/job-applications.module";
import { JobCategoryModule } from "./job-category/job-category.module";
import { JobPostingsModule } from "./job-postings/job-postings.module";
import { JobSeekerPostingModule } from "./job-seeker-posting/job-seeker-posting.module";
import { JobSeekerSkillsModule } from "./job-seeker-skills/job-seeker-skills.module";
import { JobSeekersModule } from "./job-seekers/job-seekers.module";
import { JobsNotificationsModule } from "./jobs-notifications/jobs-notifications.module";
import { SavedJobsModule } from "./saved-jobs/saved-jobs.module";
import { SkillsCategoryModule } from "./skills-category/skills-category.module";
import { SkillsModule } from "./skills/skills.module";
import { UsersModule } from "./users/users.module";
import { WorkExperienceModule } from "./work-experience/work-experience.module";
import { RedisModule } from './redis/redis.module';

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
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
    JobApplicationsModule,
    WorkExperienceModule,
    SavedJobsModule,
    JobsNotificationsModule,
    JobCategoryModule,
    SkillsCategoryModule,
    SkillsModule,
    JobSeekerSkillsModule,
    JobSeekerPostingModule,
    JobPostingsModule,
    ChatModule,
    EduModule,
    CompanyModule,
    AuthModule,
    UsersModule,
    EmployersModule,
    JobSeekersModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
