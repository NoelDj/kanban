import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { KanbanBoard } from './KanbanBoard';

@Entity()
@Unique({ properties: ['email'] })
export class User {

    @PrimaryKey()
    id!: number;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property()
    @Unique()
    email!: string;

    @Property()
    password: string;

    @Property()
    salt: string;

    @OneToMany(() => KanbanBoard, kanbanBoard => kanbanBoard.user)
    kanbanBoards = new Collection<KanbanBoard>(this)
}