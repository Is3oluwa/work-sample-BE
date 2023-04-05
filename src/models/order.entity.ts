import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from 'src/models/user.entity';
import { Product } from './product.entity';

@Entity() 
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total: number;

    @CreateDateColumn()
    date: Date;

    @OneToOne(() => User, (user) => user.orders)
    user: User;

}