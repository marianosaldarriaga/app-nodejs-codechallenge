import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("accounts")
export class AccountEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'external_id'})
    externalId: string;

    @Column()
    balance: number;
}
