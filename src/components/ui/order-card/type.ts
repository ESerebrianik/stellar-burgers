import { Location } from 'react-router-dom';
import { TIngridient } from '@utils-types';

export type OrderCardUIProps = {
  orderInfo: TOrderInfo;
  maxIngridients: number;
  locationState: { background: Location };
};

type TOrderInfo = {
  ingridientsInfo: TIngridient[];
  ingridientsToShow: TIngridient[];
  remains: number;
  total: number;
  date: Date;
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingridients: string[];
};
