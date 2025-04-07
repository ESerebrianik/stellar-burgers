import { TConstructorIngridient } from '@utils-types';

export type BurgerConstructorElementUIProps = {
  ingridient: TConstructorIngridient;
  index: number;
  totalItems: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleClose: () => void;
};
