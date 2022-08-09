import { useState } from 'react';
import {
  InternalRefetchQueriesInclude,
  useQuery,
  useMutation,
  ApolloError,
  MutationFunction,
} from '@apollo/client';
import { MutationFetchPolicy } from '@apollo/client/core/watchQueryOptions';
import { MUTATION_CREATE_TASK, MUTATION_REMOVE_TASK, MUTATION_UPDATED_TASK, QUERY_TASKS } from '@sdjs-02/queries';
import { IPageInfo, ITask } from '@sdjs-02/interfaces';

interface IOperationVariables {
  fetchPolicy: MutationFetchPolicy;
  refetchQuerie: InternalRefetchQueriesInclude;
  onCompleted: (data: IUseTasksResponse) => void;
  onError: (data: ApolloError) => void;
}

interface IUseTasksActions {
  create: MutationFunction;
  remove: MutationFunction;
  update: MutationFunction;
}

interface IUseData {
  count: number;
  items: [ITask];
  pageInfo: IPageInfo;
}

interface IUseTasksState {
  data: IUseData | undefined;
  loading: boolean;
  errorMessage: string;
}

interface IUseTasksResponse {
  tasks?: IUseData;
}

export const useTasks = (currentPage: number): [IUseTasksState, IUseTasksActions] => {
  const [data, setData] = useState<IUseData>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onCompleted = (response: IUseTasksResponse) => {
    setData(response?.tasks);
  };

  const onError = ({ message }: ApolloError) => {
    setErrorMessage(message);
  };

  const requestOptions: IOperationVariables = {
    fetchPolicy: 'no-cache',
    refetchQuerie: [QUERY_TASKS],
    onCompleted,
    onError,
  };

  const { loading: getLoading } = useQuery<IUseTasksResponse>(QUERY_TASKS, {
    ...requestOptions,
    variables: { page: currentPage },
  });

  const [create, { loading: createLoading }] = useMutation<IUseTasksResponse>(MUTATION_CREATE_TASK, {
    refetchQueries: [QUERY_TASKS],
  });

  const [update, { loading: updateLoading }] = useMutation<IUseTasksResponse>(
    MUTATION_UPDATED_TASK,
    requestOptions
  );

  const [remove, { loading: removeLoading }] = useMutation<IUseTasksResponse>(
    MUTATION_REMOVE_TASK,
    requestOptions
  );

  const actions = { create, update, remove };
  const loading = getLoading || createLoading || updateLoading || removeLoading;

  return [{ data, loading, errorMessage }, actions];
};
