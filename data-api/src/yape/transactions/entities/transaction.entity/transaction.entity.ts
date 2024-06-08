import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TypeEntity} from "../type.entity/type.entity";
import {StatusEntity} from "../status.entity/status.entity";

@Entity("transactions")
export class TransactionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'external_id'})
    externalId: string;

    @Column()
    value: number;

    @Column()
    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'account_debit_id'})
    accountDebitId: number;

    @Column({name: 'account_credit_id'})
    accountCreditId: number;

    @ManyToOne(() => TypeEntity, type => type.id)
    @JoinColumn({name: 'type_id'})
    type: TypeEntity;

    @ManyToOne(() => StatusEntity, status =>status.id)
    @JoinColumn({name: 'status_id'})
    status: StatusEntity;
}
