import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Asegúrate de importar chart.js/auto para registrar los controladores necesarios.

const Graph = ({ data }) => {
  // Verifica si el objeto data tiene propiedades antes de proceder.
  const hasData = data && Object.keys(data).length > 0;
  const labels = hasData ? Object.keys(data) : [];
  const datasets = hasData ? [{
    label: 'Valor',
    data: labels.map(key => data[key].valor || 0), // Usa || 0 para manejar undefined o null.
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderWidth: 1,
  }] : [];

  return (
    <Bar
      data={{ labels, datasets }}
      options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true, // Configura la visualización de la leyenda (puedes ajustarlo según necesites).
          },
          tooltip: {
            enabled: true, // Habilita los tooltips (puedes ajustarlo según necesites).
          },
        },
      }}
    />
  );
};

Graph.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      codigo: PropTypes.string,
      nombre: PropTypes.string,
      unidad_medida: PropTypes.string,
      fecha: PropTypes.string,
      valor: PropTypes.number,
    })
  ).isRequired,
};

export default Graph;
