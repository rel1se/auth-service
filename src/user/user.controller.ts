import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { Authorized } from '../auth/decorators/authorized.decorator'
import { Authorizaation } from '../auth/decorators/auth.decorator'
import { UserRole } from '../../prisma/__generated__'
import { UpdateUserDto } from '@/user/dto/update-user.dto'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Authorizaation()
	@HttpCode(HttpStatus.OK)
	@Get('profile')
	public async findProfile(@Authorized('id') userId: string) {
		return this.userService.findById(userId)
	}

	@Authorizaation(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get('by-id/:id')
	public async findById(@Param('id') userId: string) {
		return this.userService.findById(userId)
	}

	@Authorizaation()
	@HttpCode(HttpStatus.OK)
	@Patch('profile')
	public async updateProfile(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserDto)
	{
		return this.userService.update(userId, dto)
	}
}

