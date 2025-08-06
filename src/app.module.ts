import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { JobCategoryModule } from './job_category/job_category.module';
import { SkillsCategoryModule } from './skills_category/skills_category.module';
import { SkillsModule } from './skills/skills.module';
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
    JobCategoryModule,
    SkillsCategoryModule,
    SkillsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
