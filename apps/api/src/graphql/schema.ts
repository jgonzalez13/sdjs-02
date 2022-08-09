import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import { Task } from '../models';

const TASKS_PER_PAGE = 3;

export const TaskTC = composeMongoose(Task, {});

schemaComposer.Query.addFields({
  task: TaskTC.mongooseResolvers.findOne(),
  tasks: TaskTC.mongooseResolvers.pagination({ perPage: TASKS_PER_PAGE }),
});

schemaComposer.Mutation.addFields({
  createTask: TaskTC.mongooseResolvers.createOne(),
  updateTask: TaskTC.mongooseResolvers.updateOne(),
  removeTask: TaskTC.mongooseResolvers.removeOne(),
});

export const schema = schemaComposer.buildSchema();
