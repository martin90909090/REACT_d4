import { useEffect, useState } from 'react';
import Searcher from '../Searcher/Searcher.jsx';
import Order from '../Order/Order.jsx';
import Graph from '../Graph/Graph.jsx';

const MiApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIndicatorData = async () => {
    try {
      const response = await fetch('https://mindicador.cl/api');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const { version, autor, fecha, ...indicators } = data;
      return indicators;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  };

  const sortData = () => {
    const sorted = Object.keys(data).sort().reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
    setData(sorted);
  };

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchIndicatorData();
      if (fetchedData) {
        setData(fetchedData);
        setError(null);
      } else {
        setError('Failed to fetch data. Please try again later.');
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
        <h1>Últimos valores registrados de los principales indicadores</h1>
        <Order onSort={sortData} />
        <Searcher data={data} />
        <Graph data={data} />
    </div>
  );
};

export default MiApi;