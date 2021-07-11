import { ICard } from "../models/card-types"

export const addCard = (card: ICard) => ({
    type: 'ADD_CARD',
    card
})

export const refreshState = (state: any) => ({
    type: 'REFRESH_STATE',
    state
})
