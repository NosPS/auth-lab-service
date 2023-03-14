import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'user' })
@Unique(['username'])
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: false })
    username: string;
    @Column({ nullable: false })
    password: string;
    @Column({ nullable: true })
    refresh_token: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
