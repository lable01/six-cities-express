export const populateFavorites = {
  $lookup: {
    from: 'offers',
    localField: 'favorites',
    foreignField: '_id',
    as: 'favorites',
  },
};
