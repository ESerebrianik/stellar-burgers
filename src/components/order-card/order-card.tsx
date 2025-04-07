import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngridient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { getAllIngridients } from '../../services/slices/ingridients';
import { useSelector } from '../../services/store';

const maxIngridients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();

  /** TODO: взять переменную из стора */
  const ingridients = useSelector(getAllIngridients);

  console.log('order', order);

  const orderInfo = useMemo(() => {
    if (!ingridients.length) return null;

    const ingridientsInfo = order.ingridients.reduce(
      (acc: TIngridient[], item: string) => {
        const ingridient = ingridients.find((ing) => ing._id === item);
        if (ingridient) return [...acc, ingridient];
        return acc;
      },
      []
    );

    const total = ingridientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingridientsToShow = ingridientsInfo.slice(0, maxIngridients);

    const remains =
      ingridientsInfo.length > maxIngridients
        ? ingridientsInfo.length - maxIngridients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingridientsInfo,
      ingridientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingridients]);

  if (!orderInfo) return null;
  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngridients={maxIngridients}
      locationState={{ background: location }}
    />
  );
});
