import mongoose from 'mongoose';
import { ITaskMongoose } from '@sdjs-02/interfaces';

export interface ITaskDocument extends ITaskMongoose, mongoose.Document {}

export const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 120,
  },
  description: {
    type: String,
    required: true,
    minLength: 100,
    maxLength: 1000,
  },
  status: {
    type: String,
    required: true,
  },
});

export const Task = mongoose.model<ITaskDocument>('Task', TaskSchema);
