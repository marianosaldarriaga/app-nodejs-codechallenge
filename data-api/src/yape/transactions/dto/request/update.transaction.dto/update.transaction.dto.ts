import {IsNotEmpty, IsString, Length} from "class-validator";

export class UpdateTransactionDto {

    @IsNotEmpty()
    @IsString()
    @Length(7,8)
    status: string;

}
