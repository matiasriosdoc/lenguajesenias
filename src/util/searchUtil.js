import CATEGORIES_INDEX from '../categoriesIndex';

// https://stackoverflow.com/a/37511463/3916621
export const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const searchVideos = searchString => {
  if (!searchString || searchString.length <= 1) {
    return [];
  }
  const withoutAccents = removeAccents(searchString);
  const { categories } = CATEGORIES_INDEX;
  return categories.reduce((accFound, category) => {
    const foundVideos = category.videos.filter(video =>
      video.search_name_es.includes(withoutAccents),
    );
    return [...accFound, ...foundVideos];
  }, []);
};
