import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("status")
export class StatusEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
