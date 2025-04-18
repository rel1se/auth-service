import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	image: string;


	userName?: string;
	userImage?: string;
}
