import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('books')
export class Book{
     @PrimaryColumn()
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type:'varchar', length: 64 })
    name: string;

    @Column({type:'varchar', length: 64 })
    author: string;

    @Column({type:'varchar'})
    isbn: string;

    @Column({type:'integer'})
    publishedYear: number;

    @Column({type:'boolean', default:true})
    isAvailable: boolean;


    @CreateDateColumn({'name':'updated_at '})
    updatedAt: Date;

    @UpdateDateColumn({'name':'created_at '})
    createdAt: Date;

    @DeleteDateColumn({'name':'deleted_at ', nullable:true})
    deletedAt: Date;
}