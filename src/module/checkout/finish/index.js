import { Title } from 'components';
import { createOrderId } from 'utils';
import { useCheckoutStore } from 'store';

import './style.scss';

const Finish = ({ onChangeActiveSection = () => {} }) => {
  const shipmentName = useCheckoutStore((state) => state.shipmentName);
  const shipmentEst = useCheckoutStore((state) => state.shipmentEst);

  return (
    <div className="finish-container">
      <div className="finish-wrapper">
        <Title>Thank you</Title>
        <p className="order-id">Order ID: {createOrderId(5)} </p>
        <p className="order-shipment">
          Your order today will be delivered {shipmentEst} with {shipmentName}
        </p>
        <button
          className="homepage-button"
          onClick={() => onChangeActiveSection(1)}>
          <img src="/img/arrow-left.svg" alt="back to homepage" />
          <p>Go To Homepage</p>
        </button>
      </div>
    </div>
  );
};

export { Finish };
