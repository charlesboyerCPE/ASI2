/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * Card Rest Api
 * Information about the Card Rest API and how to interact with
 * OpenAPI spec version: 1.0
 */
import type { CardDTO, GenerateCardParams } from '../entities';
import { cardApi } from '../api/cardApi';

export const getCardById = (id: number) => {
  return cardApi<CardDTO>({ url: `/api/cards/${id}`, method: 'get' });
};

export const updateCard = (id: number, cardDTO: CardDTO) => {
  return cardApi<CardDTO>({
    url: `/api/cards/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: cardDTO,
  });
};

export const deleteCard = (id: number) => {
  return cardApi<boolean>({ url: `/api/cards/${id}`, method: 'delete' });
};

export const getAllCards = () => {
  return cardApi<CardDTO[]>({ url: `/api/cards`, method: 'get' });
};

export const generateCard = (params?: GenerateCardParams) => {
  return cardApi<CardDTO>({ url: `/api/cards`, method: 'post', params });
};

export const getAllCardsOnSell = () => {
  return cardApi<CardDTO[]>({ url: `/api/cards/onSell`, method: 'get' });
};

export type GetCardByIdResult = NonNullable<
  Awaited<ReturnType<typeof getCardById>>
>;
export type UpdateCardResult = NonNullable<
  Awaited<ReturnType<typeof updateCard>>
>;
export type DeleteCardResult = NonNullable<
  Awaited<ReturnType<typeof deleteCard>>
>;
export type GetAllCardsResult = NonNullable<
  Awaited<ReturnType<typeof getAllCards>>
>;
export type GenerateCardResult = NonNullable<
  Awaited<ReturnType<typeof generateCard>>
>;
export type GetAllCardsOnSellResult = NonNullable<
  Awaited<ReturnType<typeof getAllCardsOnSell>>
>;