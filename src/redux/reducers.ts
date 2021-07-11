const initialState = {
    cards: []
}

let newState

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_FILTER':
            newState = {
                ...state,
                filters: [...state.filters, action.filter]
            }
            cache.writeData('state', newState)
            return newState
        case 'ADD_BOOK':
            newState = {
                ...state,
                books: [...state.books, action.book]
            }
            cache.writeData('state', newState)
            return newState
        case 'FILTER_BOOKS':
            console.log(action)
            newState = {
                ...state,
                booksToShow: state.books.filter(book => {
                    // book.category.id === action.filter.id
                    if (action.filter.id !== 0)
                        return book.category.id === action.filter.id
                    return true
                }),
                currentFilter: action.filter
            }
            cache.writeData('state', newState)
            return newState
        case 'REFRESH_STATE':
            return action.state
        default:
            return state
    }
}

export default reducer
