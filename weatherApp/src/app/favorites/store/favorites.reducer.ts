import * as FavoritesAction from './favorites.action';

const initialState = {
    favorites: []
}

export function favoritesReducer(state = initialState, action) {
    switch (action.type) {
        case FavoritesAction.ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };

        case FavoritesAction.REMOVE_FAVORITE:
            console.log(action.payload)
            return {
                ...state,
                favorites: state.favorites.filter((favoriteObj) => {
                    console.log(favoriteObj)
                   return favoriteObj.name !== action.payload
                })
            }
        default:
            return initialState;
    }
}