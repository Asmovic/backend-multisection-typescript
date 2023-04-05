import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import config from './config/keys';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), ThrottlerModule.forRoot({
    ttl: 60,
    limit: 10,
  }), MongooseModule.forRoot(config.mongoURI), StudentModule, AuthModule],
  controllers: [AppController ],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard
  },
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  },AppService],
})
export class AppModule {}
