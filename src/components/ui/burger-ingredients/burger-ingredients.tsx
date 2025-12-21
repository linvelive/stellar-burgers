import React, { FC } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@zlden/react-developer-burger-ui-components';
import { BurgerIngredientsUIProps } from './type';
import { IngredientsCategoryUI } from '@ui';

export const BurgerIngredientsUI: FC<BurgerIngredientsUIProps> = ({
  currentTab,
  buns,
  sauces,
  mains,
  onTabClick,
  bunsRef,
  mainsRef,
  saucesRef,
  ingredientsCounter,
  titleBunRef,
  titleMainRef,
  titleSaucesRef
}) => (
  <section className={styles.burger_ingredients}>
    <nav>
      <div className={styles.menu}>
        {/* BUN TAB */}
        <Tab
          value='bun'
          active={currentTab === 'bun'}
          onClick={() => onTabClick('bun')}
        >
          Булки
        </Tab>

        {/* SAUCE TAB */}
        <Tab
          value='sauce'
          active={currentTab === 'sauce'}
          onClick={() => onTabClick('sauce')}
        >
          Соусы
        </Tab>

        {/* MAIN TAB */}
        <Tab
          value='main'
          active={currentTab === 'main'}
          onClick={() => onTabClick('main')}
        >
          Начинки
        </Tab>
      </div>
    </nav>

    {/* INGREDIENTS LIST */}
    <div className={styles.content}>
      {/* BUNS SECTION */}
      {/* id="bun" lets the button find this section */}
      {/* ref={bunsRef} lets the scrollbar track position */}
      <div className={styles.category} ref={bunsRef} id='bun'>
        <IngredientsCategoryUI
          title='Булки'
          ingredients={buns}
          titleRef={titleBunRef}
          ingredientsCounters={ingredientsCounter}
        />
      </div>

      {/* SAUCES SECTION */}
      <div className={styles.category} ref={saucesRef} id='sauce'>
        <IngredientsCategoryUI
          title='Соусы'
          ingredients={sauces}
          titleRef={titleSaucesRef}
          ingredientsCounters={ingredientsCounter}
        />
      </div>

      {/* MAINS SECTION */}
      <div className={styles.category} ref={mainsRef} id='main'>
        <IngredientsCategoryUI
          title='Начинки'
          ingredients={mains}
          titleRef={titleMainRef}
          ingredientsCounters={ingredientsCounter}
        />
      </div>
    </div>
  </section>
);
