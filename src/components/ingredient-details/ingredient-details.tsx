import { FC } from 'react';
import { useParams } from 'react-router-dom'; // Added for URL context
import { useSelector } from '../../services/store'; // Added for Data
import { getIngredientsSelector } from '../../services/slices/ingredientsSlice'; //
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const ingredients = useSelector(getIngredientsSelector); // Get all ingredients

  // Find the specific ingredient matching the ID from the URL
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
