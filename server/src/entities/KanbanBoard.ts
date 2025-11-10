import { Entity, ManyToOne, OneToMany, PrimaryKey, Property, Collection } from '@mikro-orm/core';
import { User } from './User';
import { KanbanColumn } from './KanbanColumn';

@Entity()
export class KanbanBoard {

    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property()
    description!: string;
   
    @ManyToOne(() => User, { nullable: true })
    user?: User;

    @OneToMany(() => KanbanColumn, kanbanColumn => kanbanColumn.kanbanBoard)
    kanbanColumns = new Collection<KanbanColumn>(this)
}