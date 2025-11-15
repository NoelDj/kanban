import { Entity, ManyToOne, OneToMany, PrimaryKey, Property, Collection, Cascade } from '@mikro-orm/core';
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

    @OneToMany(() => KanbanColumn, kanbanColumn => kanbanColumn.kanbanBoard, {cascade: [Cascade.REMOVE]})
    kanbanColumns = new Collection<KanbanColumn>(this)
}