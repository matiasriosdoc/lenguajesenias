import {
  RESTART_CATEGORIES,
  CATEGORIES_RESTARTED,
  RESTART_ALPHABETICAL_PAGE,
  ALPHABETICAL_PAGE_RESTARTED,
  RESTART_SEARCH_PAGE,
  SEARCH_PAGE_RESTARTED,
} from '../constants/';

export const restartCategories = () => {
  return {
    type: RESTART_CATEGORIES,
  };
};

export const categoriesRestarted = () => {
  return {
    type: CATEGORIES_RESTARTED,
  };
};

export const restartAlphabeticalPage = () => {
  return {
    type: RESTART_ALPHABETICAL_PAGE,
  };
};

export const alphabeticalPageRestarted = () => {
  return {
    type: ALPHABETICAL_PAGE_RESTARTED,
  };
};

export const restartSearchPage = () => {
  return {
    type: RESTART_SEARCH_PAGE,
  };
};

export const searchPageRestarted = () => {
  return {
    type: SEARCH_PAGE_RESTARTED,
  };
};
