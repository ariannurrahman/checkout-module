import { thousandSeparator } from 'utils';
import './style.scss';

const ShipmentButton = ({
  active = '',
  onClick = () => {},
  name = '',
  price = 0,
  est = '',
}) => {
  return (
    <button
      className={`${
        active === name ? 'shipment-button-active' : 'shipment-button'
      }`}
      onClick={() => onClick(name, price, est)}>
      <p className="shipment-button-name">{name}</p>
      {price ? (
        <p className="shipment-button-price">
          {thousandSeparator(price)}
          {name === 'e-Wallet' ? ' left' : ''}{' '}
        </p>
      ) : null}
    </button>
  );
};

export { ShipmentButton };
