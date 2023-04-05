import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Cart } from './cart.entity';
import { Order } from './order.entity';

@Entity() 
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;

    @Column()
    quantity: string;

    @OneToMany(() => Cart, (cart) => cart.id)
    @JoinColumn()
    cart: Cart
}