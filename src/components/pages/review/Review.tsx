import { ReviewType } from '@/types/boardType';
import React from 'react';

const Review = ({ item }: { item: ReviewType }) => {
  return <div>{item.title}</div>;
};

export default Review;
