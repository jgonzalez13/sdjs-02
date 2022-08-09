export interface ITask {
  title: string;
  description: string;
  status: string;
}

export interface IPageInfo {
  currentPage: number;
  hasNextPage: false;
  hasPreviousPage: false;
}
