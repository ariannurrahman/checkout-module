import { useCheckoutStore } from 'store';
import { thousandSeparator } from 'utils';

import './style.scss';
const COST_GOODS = 500000;
const DROPSHIP_FEE = 5900;

const Summary = ({ activeSection = 0, onChangeActiveSection = () => {} }) => {
  const totalPrice = useCheckoutStore((state) => state.totalPrice);
  const isDropship = useCheckoutStore((state) => state.isDropship);
  const shipmentPrice = useCheckoutStore((state) => state.shipmentPrice);
  const shipmentName = useCheckoutStore((state) => state.shipmentName);
  const paymentMethod = useCheckoutStore((state) => state.paymentMethod);
  const shipmentEst = useCheckoutStore((state) => state.shipmentEst);
  const payWithWallet = useCheckoutStore((state) => state.payWithWallet);
  const walletValue = useCheckoutStore((state) => state.walletValue);
  const dropShipFee = isDropship ? DROPSHIP_FEE : 0;

  const onClickPay = () => {
    const total = totalPrice + shipmentPrice + dropShipFee;

    if (paymentMethod === 'e-Wallet') {
      if (walletValue < total) {
        alert('Top up your wallet / choose different payment method');
      } else {
        payWithWallet(total);
        onChangeActiveSection(3);
      }
    } else {
      onChangeActiveSection(3);
    }
  };

  return (
    <div className="summary-container">
      <div className="summary-title-wrapper">
        <p className="summary-title-text">Summary</p>
        <p className="sub-title">10 Items purchased</p>
      </div>

      {activeSection !== 1 && shipmentName && (
        <div>
          <p className="sub-title-2">Delivery estimation</p>
          <p className="shipment-payment-text">
            {shipmentEst} by {shipmentName}
          </p>
        </div>
      )}
      {paymentMethod && activeSection === 3 && (
        <div>
          <p className="sub-title-2">Payment method</p>
          <p className="shipment-payment-text">{paymentMethod}</p>
        </div>
      )}

      <div className="summary-wrapper">
        <div className="price-wrapper">
          <p className="sub-title">Cost of goods</p>
          <p className="price">{thousandSeparator(COST_GOODS)}</p>
        </div>

        {isDropship && (
          <div className="price-wrapper">
            <p className="sub-title">Dropshipping Fee</p>
            <p className="price">
              {isDropship && thousandSeparator(DROPSHIP_FEE)}
            </p>
          </div>
        )}

        {activeSection !== 1 && shipmentName && (
          <div className="price-wrapper">
            <p className="sub-title">{shipmentName} shipment</p>
            <p className="price"> {thousandSeparator(shipmentPrice)}</p>
          </div>
        )}

        <div className="price-wrapper">
          <p className="total-price">Total</p>
          <p className="total-price">
            {thousandSeparator(totalPrice + shipmentPrice + dropShipFee)}
          </p>
        </div>
        {activeSection === 1 ? (
          <button form="delivery-form" type="submit" className="submit-button">
            Continue to Payment
          </button>
        ) : activeSection === 2 ? (
          <button
            disabled={!paymentMethod || !shipmentName}
            onClick={onClickPay}
            className="submit-button">
            {!paymentMethod
              ? 'Choose payment method'
              : `Pay with ${paymentMethod}`}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export { Summary };
