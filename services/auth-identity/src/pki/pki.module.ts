import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PkiController } from './pki.controller';
import { PkiService } from './pki.service';

@Module({
  imports: [ConfigModule],
  controllers: [PkiController],
  providers: [PkiService],
  exports: [PkiService],
})
export class PkiModule {}
