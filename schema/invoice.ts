import { z } from "zod";

export const businessInfoSchema = z.object({
  name: z
    .string({ required_error: 'Business name is required' })
    .min(1, 'Business name is required'),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
  address: z.string({ required_error: 'Address is required' }).min(4, 'Address is too short'),
  taxId: z.string().optional(),
});


export const invoiceInfoSchema = z.object({
  invoiceNumber: z
    .string({ required_error: 'Invoice Number is required' })
    .min(1, 'Invoice number is required'),
  date: z
    .string({ required_error: 'Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  dueDate: z
    .string({ required_error: 'Due Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid due date format (YYYY-MM-DD)'),
});

export const invoiceItemsSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  price: z.number({ required_error: 'Price is required' }).min(1, 'Price is too short'),
  quantity: z.number({ required_error: 'Quantity is required' }).min(1, 'Quantity is required'),
});

export type InvoiceItems = z.infer<typeof invoiceItemsSchema>;

export type InvoiceInfo= z.infer<typeof invoiceInfoSchema>;

// Infer TypeScript type from the schema
export type BusinessInfo = z.infer<typeof businessInfoSchema>;

export type Invoice = {
  senderInfo: BusinessInfo;
  recipientInfo: BusinessInfo;
  invoiceInfo: InvoiceInfo;
  items: InvoiceItems[]
}



