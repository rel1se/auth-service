import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { UserService } from '@/user/user.service'; // нужен для AuthGuard

@Module({
	controllers: [BoardController],
	providers: [
		BoardService,
		PrismaService,
		UserService,
		AuthGuard,
	],
})
export class BoardModule {}
