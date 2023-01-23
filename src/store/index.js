import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCheckoutStore = create(
  persist(
    (set) => ({
      totalPrice: 500000,
      form: {},
      shipmentName: '',
      shipmentPrice: 0,
      shipmentEst: '',
      paymentMethod: '',
      isDropship: false,
      ableToPayment: false,
      activeSection: 0,
      setActiveSection: (activeSection) => set(() => ({ activeSection })),
      setForm: (data) => set(() => ({ form: data, ableToPayment: true })),

      dropshipFee: (isDropship) => set(() => ({ isDropship })),

      setShipment: (name, price, est) =>
        set(() => ({
          shipmentName: name,
          shipmentPrice: parseInt(price),
          shipmentEst: est,
        })),

      setPayment: (payment) =>
        set(() => ({
          paymentMethod: payment,
        })),
    }),
    {
      name: 'jakmal-checkout', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// export const useCheckoutStore = create((set) => ());
