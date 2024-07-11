import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/category/models/category.model';
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  user: any;

  @IsArray()
  categories: Category[];
}

export class UpdatePostDto {
  @IsNotEmpty()
  id: number;
  content: string;
  @IsNotEmpty()
  title: string;
}
