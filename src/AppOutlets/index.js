import {getNewOutlet} from 'reconnect.js';
import {buildCatDisplayMap} from '../Utils/buildCatDisplayMap';

// configurations for "product" collection
const sortOptions = [
  {name: 'pokemon_id', display: '編號(由低到高)'},
  {name: '-pokemon_id', display: '編號(由高到低)'},
  {name: '-created', display: '上架時間(由新到舊)'},
  {name: 'created', display: '上架時間(由舊到新)'},
  {name: 'price', display: '價格(由低到高)'},
  {name: '-price', display: '價格(由高到低)'},
];

const categories = [
  {
    name: 'all',
    display: '所有分類',
    items: [],
  },
];

// configurations for "Article_Default" collection
const articleSortOptions = [
  {name: '-created', display: '發布時間(由新到舊)'},
  {name: 'created', display: '發布時間(由舊到新)'},
];

const articleCategories = [
  {
    name: 'all',
    display: '所有分類',
    items: [],
  },
];

getNewOutlet('user', null, {autoDelete: false});
getNewOutlet('loading', false, {autoDelete: false});
getNewOutlet('login-modal', false, {autoDelete: false});
getNewOutlet('contact-modal', false, {autoDelete: false});
getNewOutlet('reset-password-modal', false, {autoDelete: false});

// product collection
getNewOutlet('categories', categories, {autoDelete: false});
getNewOutlet('categoryDisplayMap', buildCatDisplayMap(categories), {
  autoDelete: false,
});
getNewOutlet('sortOptions', sortOptions, {autoDelete: false});

// Article_Default collection
getNewOutlet('articleCategories', articleCategories, {autoDelete: false});
getNewOutlet(
  'articleCategoryDisplayMap',
  buildCatDisplayMap(articleCategories),
  {
    autoDelete: false,
  },
);
getNewOutlet('articleSortOptions', articleSortOptions, {autoDelete: false});

getNewOutlet(
  'cart',
  {
    items: [],
    extra_items: [],
    discount_items: [],
  },
  {autoDelete: false},
);
getNewOutlet('dimension', {rwd: 'mobile'}, {autoDelete: false});
getNewOutlet('actions', null, {autoDelete: false});
getNewOutlet('ApiUtil', {}, {autoDelete: false});
getNewOutlet(
  'routes',
  {
    getRoute: (route, params) => {
      return null;
    },
  },
  {autoDelete: false},
);
