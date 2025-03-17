import { UserRole } from '../../../prisma/__generated__'
import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from './roles.decorator'

export function Authorizaation(...roles: UserRole[]) {
	if (roles.length > 0){
		return applyDecorators(
			Roles(...roles),
			UseGuards(AuthGuard, RolesGuard)
		)
	}

	return applyDecorators(UseGuards(AuthGuard))
}