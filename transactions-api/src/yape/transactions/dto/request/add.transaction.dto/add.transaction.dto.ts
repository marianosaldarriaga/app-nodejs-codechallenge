import {IsNotEmpty, IsPositive, IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddTransactionDto {

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    accountExternalIdDebit: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    accountExternalIdCredit: string;

    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    transferTypeId: number;

    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    value: number;
}
