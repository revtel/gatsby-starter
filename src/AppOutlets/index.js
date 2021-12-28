import {getNewOutlet} from 'reconnect.js';
import {buildCatDisplayMap} from '../Utils/buildCatDisplayMap';
import {ATTRIBUTE_DISPLAY} from '../constants';

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
    name: 'kanto',
    display: '關都地區',
    items: Object.entries(ATTRIBUTE_DISPLAY).map((attr) => ({
      name: `kanto-${attr[0]}`,
      display: attr[1].zh,
    })),
  },
  {
    name: 'johto',
    display: '城都地區',
    items: Object.entries(ATTRIBUTE_DISPLAY).map((attr) => ({
      name: `johto-${attr[0]}`,
      display: attr[1].zh,
    })),
  },
];

// configurations for "Article_Default" collection
const articleSortOptions = [
  {name: '-created', display: '發布時間(由新到舊)'},
  {name: 'created', display: '發布時間(由舊到新)'},
];

const articleCategories = [
  {
    name: 'A',
    display: 'Doc A',
  },
  {
    name: 'B',
    display: 'Doc B',
  },
  {
    name: 'C',
    display: 'Doc C',
    items: [
      {name: 'C-a', display: 'Doc C-a'},
      {name: 'C-b', display: 'Doc C-b'},
      {name: 'C-c', display: 'Doc C-c'},
    ],
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
