/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Store Rest Api
 * Information about the Store Rest API and how to interact with
 * OpenAPI spec version: 1.0
 */
import type { StoreTransactionAction } from './storeTransactionAction';

export interface StoreTransaction {
  id?: number;
  userId?: number;
  cardId?: number;
  action?: StoreTransactionAction;
  timeSt?: string;
}
