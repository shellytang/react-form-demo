let validateCategory = (payload) => {
  if(!payload.id || !payload.title || !payload.timestamp) {
    throw new Error('VALIDATION ERROR: card must have ittle and timestamp')
  }
}

let validateCard = (card) => {
  if(!card.id || !card.content || !card.categoryID) {
    throw new Error('VALIDATION ERROR: card must have id, content, and category ID')
  }
}



let initalState = {}

export default(state=initalState, action) => {
  let {type, payload} = action
  let categoryID, categoryCards
  switch(type) {

  case 'CATEGORY_CREATE':
    validateCategory(payload)
    return {...state, [payload.id]: []}

  case 'CATEGORY_DELETE':
    validateCategory(payload)
    return {...state, [payload.id]: undefined}

  case 'CARD_CREATE':
    validateCard(payload)
    categoryID = payload.categoryID
    categoryCards = [...state[categoryID]]
    return {...state, [categoryID]: [...categoryCards, payload]}

  case 'CARD_UPDATE':
    validateCard(payload)
    categoryID = payload.categoryID
    categoryCards = state[categoryID]
    return {...state,
      [categoryID]: categoryCards.map(card =>
        card.id === payload.id ? payload : card)}

  case 'CARD_DELETE':
    validateCard(payload)
    categoryID = payload.categoryID
    categoryCards = state[categoryID]
    return {...state,
      [categoryID]: categoryCards.filter(card =>
        card.id !== payload.id),
    }

  default:
    return state
  }
}
