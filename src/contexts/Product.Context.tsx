import React, {createContext, useContext, useReducer, ReactNode} from 'react';

// Product interface
export interface ProductType {
  id: number;
  title: string;
  price: number;
  stock: number;
  images: string[];
}

export enum ActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  SUBTRACT_FROM_CART = 'SUBTRACT_FROM_CART',
  DELETE_FROM_CART = 'DELETE_FROM_CART',
  CALCULATE_TOTAL = 'CALCULATE_TOTAL',
}

interface AddToCartAction {
  type: ActionTypes.ADD_TO_CART;
  payload: {
    productId: number;
    product: ProductType;
    quantity: number;
  };
}

interface SubtractFromCartAction {
  type: ActionTypes.SUBTRACT_FROM_CART;
  payload: {
    productId: number;
    quantity: number;
  };
}

interface DeleteFromCartAction {
  type: ActionTypes.DELETE_FROM_CART;
  payload: {
    productId: number;
  };
}

interface CalculateTotalAction {
  type: ActionTypes.CALCULATE_TOTAL;
}

export type Action =
  | AddToCartAction
  | SubtractFromCartAction
  | DeleteFromCartAction
  | CalculateTotalAction;

export interface ProductsState {
  cart: {
    productId: number;
    product: ProductType;
    quantity: number;
  }[];
  total: number;
}

export const initialState: ProductsState = {
  cart: [],
  total: 0,
};

export const productsReducer = (
  state: ProductsState,
  action: Action,
): ProductsState => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART: {
      const {productId, product, quantity} = action.payload;

      const existingItemIndex = state.cart.findIndex(
        item => item.productId === productId,
      );

      if (existingItemIndex !== -1) {
        // If the product is already in the cart, update the quantity
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += quantity;

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If the product is not in the cart, add it
        return {
          ...state,
          cart: [...state.cart, {productId, product, quantity}],
        };
      }
    }

    case ActionTypes.SUBTRACT_FROM_CART: {
      const {productId, quantity} = action.payload;
      const existingCartItem = state.cart.find(
        item => item.productId === productId,
      );

      if (existingCartItem) {
        const updatedCart = state.cart.map(cartItem => {
          if (cartItem.productId === productId) {
            // Subtract the quantity, and remove the item if it becomes zero
            const newQuantity = Math.max(0, cartItem.quantity - quantity);
            return {
              ...cartItem,
              quantity: newQuantity,
            };
          }
          return cartItem;
        });

        // Remove the item if its quantity becomes zero
        const filteredCart = updatedCart.filter(
          cartItem => cartItem.quantity > 0,
        );

        return {
          ...state,
          cart: filteredCart,
        };
      }
    }

    case ActionTypes.DELETE_FROM_CART: {
      const {productId} = action.payload;

      const updatedCart = state.cart.filter(
        item => item.productId !== productId,
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case ActionTypes.CALCULATE_TOTAL: {
      const total = state.cart.reduce((acc, {product, quantity}) => {
        return acc + quantity * product.price;
      }, 0);

      return {
        ...state,
        total,
      };
    }

    default:
      return state;
  }
};

interface ProductsContextProps {
  state: ProductsState;
  dispatch: React.Dispatch<Action>;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
);

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  return (
    <ProductsContext.Provider value={{state, dispatch}}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
