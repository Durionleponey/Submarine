import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi';
import {DatabaseModule} from "./common/database/database.module";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import {GraphQLModule} from "@nestjs/graphql";
import { UsersModule } from './users/users.module';
import {LoggerModule} from "nestjs-pino";
import {pinoHttp} from "pino-http";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal:true,
          validationSchema: Joi.object({
              MONGODB_URI: Joi.string().required(),
          })
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile:true
      }),
      DatabaseModule,
      UsersModule,
      LoggerModule.forRoot({
          pinoHttp:{
              transport:{
                  target: "pino-pretty",
                  options:{singleLine:true}
              }
          }
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
