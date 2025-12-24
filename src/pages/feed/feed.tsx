import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

// Import the Thunk and Selectors
import {
  getFeeds,
  getFeedOrdersSelector,
  getFeedLoadingSelector // You might need to update FeedUI to accept loading state or handle it here
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedOrdersSelector);
  const isLoading = useSelector(getFeedLoadingSelector);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  // If loading, show the spinner
  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
