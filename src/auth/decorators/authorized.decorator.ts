import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/__generated__'

export const Authorized = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		if (!user) {
			throw new UnauthorizedException(
				'Пользователь не найден в запросе. Убедитесь, что используется AuthGuard.'
			)
		}

		return data ? user[data] : user
	}
)
