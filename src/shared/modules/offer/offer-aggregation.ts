import { DEFAULT_COMMENTS_COUNT } from '../../const/index.js';
import { SortType } from '../../enum/index.js';

export const getOffersDetails = [
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user',
    },
  },
  { $unwind: '$user' },
  {
    $lookup: {
      from: 'city',
      localField: 'cityId',
      foreignField: '_id',
      as: 'city',
    },
  },
  { $unwind: '$city' },
];

export const populateAuthor = [
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user',
    },
  },
  { $unwind: '$user' },
];

export const populateCommentsCount = [
  {
    $lookup: {
      from: 'comments',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
        { $project: { _id: 1 } },
      ],
      as: 'comments',
    },
  },
  { id: { $toString: '$_id' }, commentsCount: { $size: '$comments' } },
  { $unset: 'comments' },
];

export const populateComments = [
  {
    $lookup: {
      from: 'comments',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
        { $project: { _id: 1, text: 1, rating: 1 } },
      ],
      as: 'comments',
    },
  },
  { $limit: DEFAULT_COMMENTS_COUNT },
  { $sort: { createdDate: SortType.Down } },
];
