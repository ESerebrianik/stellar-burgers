import { FC, memo } from 'react';
import styles from './burger-constructor-element.module.css';
import { ConstructorElement } from '@zlden/react-developer-burger-ui-components';
import { BurgerConstructorElementUIProps } from './type';
import { MoveButton } from '@zlden/react-developer-burger-ui-components';

export const BurgerConstructorElementUI: FC<BurgerConstructorElementUIProps> =
  memo(
    ({
      ingridient,
      index,
      totalItems,
      handleMoveUp,
      handleMoveDown,
      handleClose
    }) => (
      <li className={`${styles.element} mb-4 mr-2`}>
        <MoveButton
          handleMoveDown={handleMoveDown}
          handleMoveUp={handleMoveUp}
          isUpDisabled={index === 0}
          isDownDisabled={index === totalItems - 1}
        />
        <div className={`${styles.element_fullwidth} ml-2`}>
          <ConstructorElement
            text={ingridient.name}
            price={ingridient.price}
            thumbnail={ingridient.image}
            handleClose={handleClose}
          />
        </div>
      </li>
    )
  );
