import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';

import { TConstructorIngredient } from '../../utils/types';
import { BurgerConstructorUI } from '@ui';

import {
  getConstructorSelector,
  resetConstructor
} from '../../services/slices/constructorSlice';

import {
  orderBurger,
  resetOrder,
  getOrderModalData,
  getOrderRequest
} from '../../services/slices/newOrderSlice';

import { getUserSelector } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  Get data from Store
  const user = useSelector(getUserSelector);
  const constructorItems = useSelector(getConstructorSelector);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);

  //  Calculate Total Price
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //  Handle "Order" Button Click
  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    // Prepare data for API: [bunId, ...ingredientIds, bunId]
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i: TConstructorIngredient) => i._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(ingredientIds));
  };

  //  Handle Closing the Order Modal
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetConstructor()); // Clear the cart after successful order
    navigate('/'); // Optional: reset URL or stay on page
  };

  //  Render UI
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
