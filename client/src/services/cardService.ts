/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Card Rest Api
 * Information about the Card Rest API and how to interact with
 * OpenAPI spec version: 1.0
 */
import type { CardDTO, GenerateCardParams } from '../entities';
import { cardApi } from '../api/cardApi';

export const getAllCards = () => {
  return cardApi<CardDTO[]>({ url: ``, method: 'get' });
};

export const updateCardAsync = (cardDTO: CardDTO) => {
  return cardApi<boolean>({
    url: ``,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: cardDTO,
  });
};

export const generateCard = (params?: GenerateCardParams) => {
  return cardApi<CardDTO>({ url: ``, method: 'post', params });
};

export const getCardById = (id: number) => {
  return cardApi<CardDTO>({ url: `/${id}`, method: 'get' });
};

export const deleteCard = (id: number) => {
  return cardApi<boolean>({ url: `/${id}`, method: 'delete' });
};

export const getAllCardsOnSell = () => {
  return cardApi<CardDTO[]>({ url: `/onSell`, method: 'get' });
};

export type GetAllCardsResult = NonNullable<
  Awaited<ReturnType<typeof getAllCards>>
>;
export type UpdateCardAsyncResult = NonNullable<
  Awaited<ReturnType<typeof updateCardAsync>>
>;
export type GenerateCardResult = NonNullable<
  Awaited<ReturnType<typeof generateCard>>
>;
export type GetCardByIdResult = NonNullable<
  Awaited<ReturnType<typeof getCardById>>
>;
export type DeleteCardResult = NonNullable<
  Awaited<ReturnType<typeof deleteCard>>
>;
export type GetAllCardsOnSellResult = NonNullable<
  Awaited<ReturnType<typeof getAllCardsOnSell>>
>;
