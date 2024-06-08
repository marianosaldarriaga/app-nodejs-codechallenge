import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("types")
export class TypeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
