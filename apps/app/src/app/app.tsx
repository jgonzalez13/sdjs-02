import { useTasks } from '@sdjs-02/hooks';
import { useEffect } from 'react';

export const App = () => {
  const [{ data, loading }] = useTasks(1);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <div>Cargando...</div>;

  return <div>haola</div>;
};

export default App;
