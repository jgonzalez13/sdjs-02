export interface ITaskMongoose {
  title: string;
  description: string;
  status: string;
}
export interface ITask extends ITaskMongoose {
  _id?: string;
}

export interface IPageInfo {
  pageCount: number;
  hasNextPage: false;
  hasPreviousPage: false;
}
