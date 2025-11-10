import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { KanbanColumn } from './KanbanColumn';

@Entity()
export class KanbanTask {

   @PrimaryKey()
   id!: number;

   @Property()
   content!: string;

   @Property()
   label!: string;

   @Property()
   position!: number;

   @ManyToOne(() => KanbanColumn)
   kanbanColumn!: KanbanColumn;
}