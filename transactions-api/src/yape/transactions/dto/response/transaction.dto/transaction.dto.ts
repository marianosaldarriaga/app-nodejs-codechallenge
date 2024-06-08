import {TypeDto} from "../type.dto/type.dto";
import {StatusDto} from "../status.dto/status.dto";
import {Field, ObjectType} from "@nestjs/graphql";
import {ApiProperty} from "@nestjs/swagger";

@ObjectType()
export class TransactionDto {

    @Field()
    @ApiProperty()
    transactionExternalId: string;

    @Field()
    @ApiProperty()
    transactionType: TypeDto;

    @Field()
    @ApiProperty()
    transactionStatus: StatusDto;

    @Field(() => Number)
    @ApiProperty()
    value: number;

    @Field()
    @ApiProperty()
    createdAt: String;
}
