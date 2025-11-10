import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { KanbanBoard } from './KanbanBoard';

@Entity()
export class User {

    @PrimaryKey()
    id!: number;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    email!: string;

    @Property()
    password!: string;

    @OneToMany(() => KanbanBoard, kanbanBoard => kanbanBoard.user)
    kanbanBoards = new Collection<KanbanBoard>(this)
}