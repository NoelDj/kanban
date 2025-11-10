import { Entity, ManyToOne, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { KanbanBoard } from './KanbanBoard';
import { KanbanTask } from './KanbanTask';

@Entity()
export class KanbanColumn {

   @PrimaryKey()
   id!: number;

   @Property()
   content!: string;

   @Property()
   label!: string;

   @Property()
   position!: number;

   @ManyToOne(() => KanbanBoard)
   kanbanBoard!: KanbanBoard;

   @OneToMany(() => KanbanTask, kanbanTask => kanbanTask.kanbanColumn)
   kanbanTasks = new Collection<KanbanTask>(this)
}