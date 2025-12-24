import { FC, useMemo } from 'react';
import { useSelector } from '../../../services/store';
import {
  getFeedOrdersSelector,
  getFeedTotalSelector,
  getFeedTotalTodaySelector
} from '../../../services/slices/feedSlice';
import { FeedInfoUI } from './feed-info';

export const FeedInfo: FC = () => {
  // 1. Get the raw data from Redux
  const orders = useSelector(getFeedOrdersSelector);
  const total = useSelector(getFeedTotalSelector);
  const totalToday = useSelector(getFeedTotalTodaySelector);

  // 2. Prepare the Ready (done) list
  const readyOrders = useMemo(
    () =>
      orders
        .filter((item) => item.status === 'done')
        .map((item) => item.number)
        .slice(0, 20),
    [orders]
  );

  // 3. Prepare the Pending (in progress) list
  const pendingOrders = useMemo(
    () =>
      orders
        .filter((item) => item.status !== 'done')
        .map((item) => item.number)
        .slice(0, 20),
    [orders]
  );

  // 4. Pass everything to your UI component
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{
        orders,
        total,
        totalToday
      }}
    />
  );
};
