import ormConfig from "../mikro-orm.config.ts";
import entities from "./entities/All.ts";
import type { EntityName, EntityRepository, MikroORM, EntityManager } from "@mikro-orm/core";

type EntityWithLabel = {
  label: string;
  new (...args: any[]): any;
};

type DIContainer = {
  orm: MikroORM;
  em: EntityManager;
  [key: string]: any; // repositories will be dynamically added
};

export async function initializeORM(MikroORM: typeof import('@mikro-orm/core').MikroORM) {
  const DI = {} as DIContainer;

  DI.orm = await MikroORM.init(ormConfig);
  DI.em = DI.orm.em;

  for (const entityInstance of entities as EntityWithLabel[]) {
    if (entityInstance.label === "BaseEntity") continue;
    DI[entityInstance.label] = DI.orm.em.getRepository(entityInstance as EntityName<any>);
  }

  return DI;
}
