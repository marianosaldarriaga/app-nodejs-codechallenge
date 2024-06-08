import {TypeDto} from "../type.dto/type.dto";
import {StatusDto} from "../status.dto/status.dto";

export class TransactionDto {

    transactionExternalId: string;

    transactionType: TypeDto;

    transactionStatus: StatusDto;

    value: number;

    createdAt: string;
}
