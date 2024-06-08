import {IsNotEmpty, IsString, Length} from "class-validator";

export class UpdateDto {

    @IsNotEmpty()
    @IsString()
    @Length(7,8)
    status: string;

}
