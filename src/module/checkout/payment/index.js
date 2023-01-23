import { useState } from 'react';

import { Title } from 'components';
import { useCheckoutStore } from 'store';
import { thousandSeparator } from 'utils';
import { ShipmentButton } from './shipment-button';

import './style.scss';

const SHIPMENT_DICT = [
  {
    name: 'GO-SEND',
    price: 15000,
    est: 'Today',
  },
  {
    name: 'JNE',
    price: 9000,
    est: '2 Days',
  },
  {
    name: 'Personal Courier',
    price: 29000,
    est: '1 Day',
  },
];
const PAYMENT_DICT = [
  {
    name: 'e-Wallet',
    price: thousandSeparator(1500000),
  },
  {
    name: 'Bank Transfer',
  },
  {
    name: 'Virtual Account',
  },
];
const Payment = ({ onChangeActiveSection }) => {
  const formOnLocalStorage = JSON.parse(
    localStorage.getItem('jakmal-checkout')
  );
  const _paymentMethod = formOnLocalStorage?.state?.paymentMethod || '';
  const _shipmentName = formOnLocalStorage?.state?.shipmentName || '';

  const setPayment = useCheckoutStore((state) => state.setPayment);
  const setShipment = useCheckoutStore((state) => state.setShipment);

  const [selectedShipment, setSelectedShipment] = useState(_shipmentName);
  const [selectedPayment, setSelectedPayment] = useState(_paymentMethod);

  const onClickShipment = (name, price, est) => {
    setSelectedShipment(name);
    setShipment(name, price, est);
  };
  const onClickPayment = (name) => {
    setSelectedPayment(name);
    setPayment(name);
  };

  return (
    <div className="payment-container">
      <button className="back-button" onClick={() => onChangeActiveSection(1)}>
        <img src="/img/arrow-left.svg" alt="back to homepage" />
        <p>Back to delivery</p>
      </button>
      <div className="payment-wrapper">
        <div className="shipment">
          <div className="title-wrapper">
            <Title>Shipment</Title>
          </div>
          <div className="shipment-button-wrapper">
            {SHIPMENT_DICT.map(({ name, price, est }) => {
              return (
                <ShipmentButton
                  key={name}
                  active={selectedShipment}
                  onClick={onClickShipment}
                  name={name}
                  price={price}
                  est={est}
                />
              );
            })}
          </div>
        </div>
        <div className="payment">
          <div className="title-wrapper">
            <Title>Payment</Title>
          </div>
          <div className="shipment-button-wrapper">
            {PAYMENT_DICT.map(({ name, price }) => {
              return (
                <ShipmentButton
                  key={name}
                  active={selectedPayment}
                  onClick={onClickPayment}
                  name={name}
                  price={price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Payment };
