import { useState } from 'react';
import { useQuery, useMutation, ApolloError, MutationFunction } from '@apollo/client';
import { MutationFetchPolicy } from '@apollo/client/core/watchQueryOptions';
import { MUTATION_CREATE_TASK, MUTATION_REMOVE_TASK, MUTATION_UPDATED_TASK, QUERY_TASKS } from '@sdjs-02/queries';
import { IPageInfo, ITask } from '@sdjs-02/interfaces';

interface IOperationVariables {
  awaitRefetchQueries: boolean;
  fetchPolicy: MutationFetchPolicy;
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

  const variables = { page: currentPage };

  const onCompletedQuery = (response: IUseTasksResponse) => {
    setData(response?.tasks);
    setErrorMessage('');
  };

  const onError = ({ message }: ApolloError) => {
    setErrorMessage(message);
  };

  const requestOptions: IOperationVariables = {
    awaitRefetchQueries: true,
    fetchPolicy: 'no-cache',
    onError,
  };

  const { loading: getLoading, refetch } = useQuery<IUseTasksResponse>(QUERY_TASKS, {
    ...requestOptions,
    onCompleted: onCompletedQuery,
    variables,
  });

  const onCompletedMutation = () => {
    refetch({ variables });
  };

  const [create, { loading: createLoading }] = useMutation<IUseTasksResponse>(MUTATION_CREATE_TASK, {
    ...requestOptions,
    onCompleted: onCompletedMutation,
  });

  const [update, { loading: updateLoading }] = useMutation<IUseTasksResponse>(MUTATION_UPDATED_TASK, {
    ...requestOptions,
    onCompleted: onCompletedMutation,
  });

  const [remove, { loading: removeLoading }] = useMutation<IUseTasksResponse>(MUTATION_REMOVE_TASK, {
    ...requestOptions,
    onCompleted: onCompletedMutation,
  });

  const actions = { create, update, remove };
  const loading = getLoading || createLoading || updateLoading || removeLoading;

  return [{ data, loading, errorMessage }, actions];
};
