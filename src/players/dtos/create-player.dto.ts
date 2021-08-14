import { IsEmail, IsNotEmpty } from "class-validator";

export class CreatePlayerDto {

    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    name: string;
}