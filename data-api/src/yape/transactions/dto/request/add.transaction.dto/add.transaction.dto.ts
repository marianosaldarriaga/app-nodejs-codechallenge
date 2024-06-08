import {IsNotEmpty, IsPositive, IsUUID} from "class-validator";

export class AddTransactionDto {

    @IsNotEmpty()
    @IsUUID()
    accountExternalIdDebit: string;

    @IsNotEmpty()
    @IsUUID()
    accountExternalIdCredit: string;

    @IsNotEmpty()
    @IsPositive()
    transferTypeId: number;

    @IsNotEmpty()
    @IsPositive()
    value: number;
}
