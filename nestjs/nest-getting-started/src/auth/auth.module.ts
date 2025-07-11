import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  // imports: [PrismaModule], // replaced by global prisma module
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
