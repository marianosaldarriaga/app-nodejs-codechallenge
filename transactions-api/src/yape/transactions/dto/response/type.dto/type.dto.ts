import {Field, ObjectType} from "@nestjs/graphql";
import {ApiProperty} from "@nestjs/swagger";

@ObjectType()
export class TypeDto {
    @Field()
    @ApiProperty()
    name: string;
}
