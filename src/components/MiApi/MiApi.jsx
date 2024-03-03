import { useEffect, useState } from 'react';
import Searcher from '../Searcher/Searcher.jsx';

const MiApi = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://mindicador.cl/api')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Últimos valores registrados de los principales indicadores</h1>
      <Searcher data={data} />
    </div>
  );
};

export default MiApi;