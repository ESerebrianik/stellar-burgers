import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngridient } from '@utils-types';
import { useParams } from 'react-router-dom';
import {
  getOrderByNumber,
  getSelectedOrder
} from '../../services/slices/feeds';
import { getAllIngridients } from '../../services/slices/ingridients';
import { useDispatch, useSelector } from '../../services/store';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();

  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)));
  }, [dispatch, number]);
  /** TODO: взять переменные orderData и ingridients из стора */
  const orderData = useSelector(getSelectedOrder);

  const ingridients = useSelector(getAllIngridients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingridients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngridientsWithCount = {
      [key: string]: TIngridient & { count: number };
    };

    const ingridientsInfo = orderData.ingridients.reduce(
      (acc: TIngridientsWithCount, item) => {
        if (!acc[item]) {
          const ingridient = ingridients.find((ing) => ing._id === item);
          if (ingridient) {
            acc[item] = {
              ...ingridient,
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

    const total = Object.values(ingridientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingridientsInfo,
      date,
      total
    };
  }, [orderData, ingridients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
