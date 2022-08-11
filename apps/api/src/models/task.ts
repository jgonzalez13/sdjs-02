import mongoose from 'mongoose';
import { ITaskMongoose } from '@sdjs-02/interfaces';

export interface ITaskDocument extends ITaskMongoose, mongoose.Document {}

export const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export const Task = mongoose.model<ITaskDocument>('Task', TaskSchema);
