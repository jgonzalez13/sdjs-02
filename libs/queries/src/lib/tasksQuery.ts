import { gql } from '@apollo/client';

export const QUERY_TASKS = gql`
  query Tasks($page: Int, $filter: FilterFindManyTaskInput) {
    tasks(page: $page, filter: $filter) {
      count
      items {
        _id
        title
        description
        status
      }
      pageInfo {
        pageCount
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const MUTATION_CREATE_TASK = gql`
  mutation CreateTask($record: CreateOneTaskInput!) {
    createTask(record: $record) {
      recordId
    }
  }
`;

export const MUTATION_UPDATED_TASK = gql`
  mutation UpdateTask($record: UpdateOneTaskInput!, $filter: FilterUpdateOneTaskInput) {
    updateTask(record: $record, filter: $filter) {
      recordId
    }
  }
`;

export const MUTATION_REMOVE_TASK = gql`
  mutation RemoveTask($filter: FilterRemoveOneTaskInput) {
    removeTask(filter: $filter) {
      recordId
    }
  }
`;
