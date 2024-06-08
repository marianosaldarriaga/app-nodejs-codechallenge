import {Field, ObjectType} from "@nestjs/graphql";
import {ApiProperty} from "@nestjs/swagger";

@ObjectType()
export class StatusDto {
    @Field()
    @ApiProperty()
    name: string;
}
