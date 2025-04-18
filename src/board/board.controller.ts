// board.controller.ts

import {
	Body,
	Controller,
	Delete,
	Param,
	Patch,
	Post,
	UseGuards
} from '@nestjs/common'
import { BoardService } from './board.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { AuthGuard } from '@/auth/guards/auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { Authorized } from '@/auth/decorators/authorized.decorator'

@Controller('organization/:orgId/board')
@UseGuards(AuthGuard, RolesGuard)
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Post()
	async createBoard(
		@Param('orgId') orgId: string,
		@Authorized('id') userId: string,
		@Body() dto: CreateBoardDto
	) {
		return this.boardService.create(orgId, userId, {
			...dto,
		})
	}

	@Patch(':id')
	async updateBoard(
		@Param('orgId') orgId: string,
		@Param('id') boardId: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateBoardDto
	) {
		return this.boardService.update(orgId, userId, boardId, {
			...dto,
		})
	}

	@Delete(':id')
	async deleteBoard(
		@Param('orgId') orgId: string,
		@Param('id') boardId: string,
		@Authorized('id') userId: string,
	) {
		return this.boardService.delete(
			orgId,
			userId,
			boardId,
		)
	}
}
