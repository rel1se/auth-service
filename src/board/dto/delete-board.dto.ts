import { IsNotEmpty, IsString } from 'class-validator'

export class DeleteBoardDto {
	@IsString()
	@IsNotEmpty()
	id: string

	userName?: string;
	userImage?: string;
}
