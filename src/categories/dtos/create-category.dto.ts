import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Event } from "../interfaces/category.interface";

export class CreateCategoryDto {

    @IsString()
    @IsNotEmpty()
    readonly category: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    events: Array<Event>;
}