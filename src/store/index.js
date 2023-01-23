import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCheckoutStore = create(
  persist(
    (set) => ({
      walletValue: 1500000,
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
      payWithWallet: (price) =>
        set((state) => ({
          walletValue: state.walletValue - parseInt(price),
        })),
      setForm: (data) => set(() => ({ form: data, ableToPayment: true })),

      reset: () =>
        set(() => ({
          form: {},
          isDropship: false,
          shipmentName: '',
          shipmentPrice: 0,
          shipmentEst: '',
          activeSection: 1,
          paymentMethod: '',
        })),

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
