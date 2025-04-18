// board.service.ts

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ACTION, ENTITY_TYPE } from '@prisma/__generated__';

@Injectable()
export class BoardService {
	constructor(private readonly prisma: PrismaService) {}

	async create(orgId: string, userId: string, dto: CreateBoardDto) {
		const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = dto.image.split('|');

		if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
			throw new Error('Изображение невалидно');
		}

		const board = await this.prisma.board.create({
			data: {
				orgId,
				title: dto.title,
				imageId,
				imageThumbUrl,
				imageFullUrl,
				imageUserName,
				imageLinkHTML,
			},
		});

		// await this.prisma.auditLog.create({
		// 	data: {
		// 		orgId,
		// 		action: ACTION.CREATE,
		// 		entityId: board.id,
		// 		entityTitle: board.title,
		// 		entityType: ENTITY_TYPE.BOARD,
		// 		userId,
		// 		userImage: dto.userImage || '',
		// 		userName: dto.userName || '',
		// 	},
		// });

		return board;
	}

	async update(orgId: string, userId: string, boardId: string, dto: UpdateBoardDto) {
		const board = await this.prisma.board.findUnique({
			where: { id: boardId, orgId },
		});

		if (!board) throw new NotFoundException('Доска не найдена');

		const updated = await this.prisma.board.update({
			where: { id: boardId },
			data: {
				title: dto.title,
			},
		});

		// await this.prisma.auditLog.create({
		// 	data: {
		// 		orgId,
		// 		action: ACTION.UPDATE,
		// 		entityId: updated.id,
		// 		entityTitle: updated.title,
		// 		entityType: ENTITY_TYPE.BOARD,
		// 		userId,
		// 		userImage: dto.userImage || '',
		// 		userName: dto.userName || '',
		// 	},
		// });

		return updated;
	}

	async delete(orgId: string, userId: string, boardId: string, userName?: string, userImage?: string) {
		const board = await this.prisma.board.findUnique({
			where: { id: boardId, orgId },
		});

		if (!board) throw new NotFoundException('Доска не найдена');

		await this.prisma.board.delete({ where: { id: boardId } });

		await this.prisma.auditLog.create({
			data: {
				orgId,
				action: ACTION.DELETE,
				entityId: board.id,
				entityTitle: board.title,
				entityType: ENTITY_TYPE.BOARD,
				userId,
				userImage: userImage || '',
				userName: userName || '',
			},
		});
	}
}
