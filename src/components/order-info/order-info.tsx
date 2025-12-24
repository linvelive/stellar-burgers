import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/slices/ingredientsSlice'; //
import { getOrdersSelector } from '../../services/slices/ordersSlice';
import { getFeedOrdersSelector } from '../../services/slices/feedSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams<{ number: string }>(); // Grabs number from URL

  const ingredients = useSelector(getIngredientsSelector); // Pulls ingredients
  const feedOrders = useSelector(getFeedOrdersSelector);
  const personalOrders = useSelector(getOrdersSelector); // Pulls personal orders

  // Find the specific order based on the URL number
  const orderData = useMemo(() => {
    if (!number) return null;
    const allOrders = [...feedOrders, ...personalOrders];
    return allOrders.find((item) => item.number === Number(number));
  }, [number, feedOrders, personalOrders]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    // If orderData or ingredients aren't ready, return null to show Preloader
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
