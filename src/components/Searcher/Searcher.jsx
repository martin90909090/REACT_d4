import { useState } from 'react';
import PropTypes from 'prop-types';

const Searcher = ({ data }) => {
  const [search, setSearch] = useState('');

  const filteredData = Object.keys(data)
    .filter(key => key.includes(search))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar indicador..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {Object.entries(filteredData).map(([key, value]) => (
          <li key={key}>{`${key}: ${value.valor}`}</li>
        ))}
      </ul>
    </div>
  );
};

Searcher.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Searcher;