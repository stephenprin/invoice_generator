import { z } from 'zod';
import { create } from 'zustand';

import { BusinessInfo, Invoice, InvoiceInfo, InvoiceItems } from '~/schema/invoice';

export type InvoiceState = {
  newInvoice: Partial<Invoice>;
  addSenderInfo: (senderInfo: BusinessInfo) => void;
  addRecipientInfo: (recipientInfo: BusinessInfo) => void;
  addInvoiceInfo: (invoiceInfo: InvoiceInfo) => void;
  addItems: (items: InvoiceItems[]) => void;
  getSubTotal: () => number;
  getTax: () => number;
  getTotal: () => number;
};

export const useStore = create<InvoiceState>((set, get) => ({
  newInvoice: {},
  addSenderInfo: (senderInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, senderInfo } })),
  addRecipientInfo: (recipientInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, recipientInfo } })),
  addInvoiceInfo: (invoiceInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, invoiceInfo } })),
  addItems: (items) => set((state) => ({ newInvoice: { ...state.newInvoice, items } })),
  getSubTotal: () => {
    const items = get().newInvoice.items || [];
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
  getTax: () => {
    const items = get().newInvoice.items || [];
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.1;
  },
  getTotal: () => {
    const items = get().newInvoice.items || [];
    return items.reduce((acc, item) => acc + item.price * item.quantity * 1.1, 0);
  },
}));

