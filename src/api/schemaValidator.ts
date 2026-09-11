import { z } from 'zod';

export const SubscriberSchema = z.object({
  subscriber_id: z.string().min(3),
  full_name: z.string().min(2),
  email: z.string().email(),
  phone_number: z.string(),
  status: z.enum(['PENDING', 'ACTIVE', 'SUSPENDED']),
});

export const OrderSchema = z.object({
  order_id: z.string().min(3),
  subscriber_id: z.string().min(3),
  total_amount: z.number().positive(),
  order_status: z.enum(['SUBMITTED', 'PROCESSING', 'COMPLETED', 'FAILED']),
  idempotency_key: z.string(),
});

export const BillingLedgerSchema = z.object({
  ledger_id: z.string().min(3),
  order_id: z.string().min(3),
  subscriber_id: z.string().min(3),
  amount_charged: z.number().positive(),
  payment_status: z.enum(['PENDING', 'SETTLED', 'FAILED']),
});

export function validateSubscriberPayload(data: unknown) {
  return SubscriberSchema.safeParse(data);
}

export function validateOrderPayload(data: unknown) {
  return OrderSchema.safeParse(data);
}

export function validateBillingPayload(data: unknown) {
  return BillingLedgerSchema.safeParse(data);
}
