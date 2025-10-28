import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database/typeorm.config';
import { CurriculumModule } from './modules/curriculums/curriculum.module';
import { JobModule } from './modules/jobs/job.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    JobModule,
    CurriculumModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
