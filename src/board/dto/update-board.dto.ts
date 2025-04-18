import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBoardDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	userName?: string;
	userImage?: string;
}
