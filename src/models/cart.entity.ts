import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product.entity';
import { User } from './user.entity';


@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    total: number;

    @Column()
    quantity: number;

    @ManyToOne(() => User, (user) => user.name)
    user: User;

    @ManyToOne(() => Product, (product) => product.id)
    product: Product;
}