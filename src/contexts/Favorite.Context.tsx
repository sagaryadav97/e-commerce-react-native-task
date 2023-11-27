import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export enum FavActionTypes {
  LIKE = 'LIKE',
  UNLIKE = 'UNLIKE',
}

interface LikeAction {
  type: FavActionTypes.LIKE;
  payload: {
    productId: number;
  };
}

interface UnlikeAction {
  type: FavActionTypes.UNLIKE;
  payload: {
    productId: number;
  };
}

export type Action = LikeAction | UnlikeAction;

export interface FavoritesState {
  likedProducts: number[];
}

export const initialFavoritesState: FavoritesState = {
  likedProducts: [],
};

export const favoritesReducer = (state: FavoritesState, action: Action): FavoritesState => {
  switch (action.type) {
    case FavActionTypes.LIKE: {
      const { productId } = action.payload;
      return {
        ...state,
        likedProducts: [...state.likedProducts, productId],
      };
    }

    case FavActionTypes.UNLIKE: {
      const { productId } = action.payload;
      const updatedLikedProducts = state.likedProducts.filter((id) => id !== productId);
      return {
        ...state,
        likedProducts: updatedLikedProducts,
      };
    }

    default:
      return state;
  }
};

interface FavoritesContextProps {
  state: FavoritesState;
  dispatch: React.Dispatch<Action>;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialFavoritesState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>{children}</FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) { 
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
