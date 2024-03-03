import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Order = ({ onSort }) => (
  <Button onClick={onSort}>Ordenar</Button>
);

Order.propTypes = {
  onSort: PropTypes.func.isRequired,
};

export default Order;