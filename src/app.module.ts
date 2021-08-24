import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.atp6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

@Module({
  imports: [
    ConfigModule.forRoot(),
    PlayersModule, 
    CategoriesModule,
    MongooseModule.forRoot(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }), CategoriesModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}