import { Entity, ManyToOne, PrimaryKey, Property, OneToMany, Collection, Cascade } from '@mikro-orm/core';
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

   @ManyToOne(() => KanbanBoard, {deleteRule: 'cascade'})
   kanbanBoard!: KanbanBoard;

   @OneToMany(() => KanbanTask, kanbanTask => kanbanTask.kanbanColumn, {cascade: [Cascade.REMOVE]})
   kanbanTasks = new Collection<KanbanTask>(this)
}