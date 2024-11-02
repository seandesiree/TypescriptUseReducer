import React, { useReducer } from 'react';

interface ShoppingCartItem {
  id: number;
  name: string;
  price: number;
}

type ShoppingCartAction =
  | { type: 'ADD_ITEM'; payload: ShoppingCartItem }
  | { type: 'REMOVE_ITEM'; payload: number };

const shoppingCartReducer = (state: ShoppingCartItem[], action: ShoppingCartAction): ShoppingCartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

const ShoppingCart: React.FC = () => {
  const initialState: ShoppingCartItem[] = [];

  const [cart, dispatch] = useReducer(shoppingCartReducer, initialState);

  const addItemToCart = () => {
    const newItem: ShoppingCartItem = {
      id: Date.now(),
      name: 'Sample Item',
      price: 10.99,
    };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  const calculateTotalCost = (): number => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <button onClick={addItemToCart}>Add Item</button>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total Cost: ${calculateTotalCost().toFixed(2)}</h2>
    </div>
  );
};

export default ShoppingCart;
