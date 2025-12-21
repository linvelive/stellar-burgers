import { useState, FC, useMemo, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import { useSelector } from '../../services/store';

import { TIngredient } from '../../utils/types';

import { BurgerIngredientsUI } from '../../components/ui';
import { getConstructorSelector } from '../../services/slices/constructorSlice';

type TTabMode = 'bun' | 'sauce' | 'main';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const constructorItems = useSelector(getConstructorSelector);

  const buns = useMemo(
    () => ingredients.filter((i: TIngredient) => i.type === 'bun'),

    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter((i: TIngredient) => i.type === 'main'),

    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((i: TIngredient) => i.type === 'sauce'),

    [ingredients]
  );

  const ingredientsCounter = useMemo(() => {
    const { bun, ingredients } = constructorItems;
    const counters: Record<string, number> = {};

    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });

    if (bun) {
      counters[bun._id] = 2;
    }

    return counters;
  }, [constructorItems]);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  // useInView returns a 'Callback Ref' (a function)

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });

  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });

  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);

    const element = document.getElementById(tab);

    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      onTabClick={onTabClick}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      titleBunRef={bunsRef as any}
      titleMainRef={mainsRef as any}
      titleSaucesRef={saucesRef as any}
      ingredientsCounter={ingredientsCounter}
    />
  );
};
