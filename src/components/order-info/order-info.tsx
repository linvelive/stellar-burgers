import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom'; // 1. Added for URL context
import { useSelector } from '../../services/store'; // 2. Added for Data
import { getIngredientsSelector } from '../../services/slices/ingredientsSlice'; //
import { getFeedOrdersSelector } from '../../services/slices/feedSlice'; //
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams<{ number: string }>(); // Grabs number from URL
  const ingredients = useSelector(getIngredientsSelector); // Pulls ingredients
  const orders = useSelector(getFeedOrdersSelector); // Pulls orders

  // Find the specific order based on the URL number
  const orderData = orders.find((item) => item.number === Number(number));

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
