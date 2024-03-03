import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Searcher = ({ data }) => {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState({});

  useEffect(() => {
    const handler = setTimeout(() => {
      const result = Object.keys(data)
        .filter(key => key.includes(search))
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {});
      setSortedData(result);
    }, 300);

    return () => clearTimeout(handler);
  }, [search, data]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar indicador..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {Object.entries(sortedData).map(([key, value]) => (
          <li key={key}>{`${key}: ${value.valor}`}</li>
        ))}
      </ul>
    </div>
  );
};

Searcher.propTypes = {
  data: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Searcher;