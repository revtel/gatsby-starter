import {getNewOutlet} from 'reconnect.js';
import {buildCatDisplayMap} from 'rev.sdk.js/Utils/buildCatDisplayMap';
import './featureOptions';

/**
 * **************************************************
 * common / basic
 * **************************************************
 */
getNewOutlet('user', null, {autoDelete: false});
getNewOutlet('landing', null, {autoDelete: false});
getNewOutlet('dimension', {rwd: 'mobile'}, {autoDelete: false});
getNewOutlet('actions', null, {autoDelete: false});
getNewOutlet('ApiUtil', {}, {autoDelete: false});
getNewOutlet(
  'cart',
  {
    items: [],
    extra_items: [],
    discount_items: [],
  },
  {autoDelete: false},
);
getNewOutlet(
  'routes',
  {
    getRoute: (route, params) => {
      return null;
    },
  },
  {autoDelete: false},
);

/**
 * **************************************************
 * modal / spinner related
 * **************************************************
 */
getNewOutlet('loading', false, {autoDelete: false});
getNewOutlet('login-modal', false, {autoDelete: false});
getNewOutlet('reset-password-modal', false, {autoDelete: false});

/**
 * **************************************************
 * product / article related
 * **************************************************
 */
const defaultCats = [
  {
    name: 'all',
    display: '所有分類',
    items: [],
  },
];

getNewOutlet('categories', defaultCats, {autoDelete: false});
getNewOutlet('categoryDisplayMap', buildCatDisplayMap(defaultCats), {
  autoDelete: false,
});
getNewOutlet(
  'sortOptions',
  [
    {name: '-created', display: '上架時間(由新到舊)'},
    {name: 'created', display: '上架時間(由舊到新)'},
    {name: 'price', display: '價格(由低到高)'},
    {name: '-price', display: '價格(由高到低)'},
  ],
  {autoDelete: false},
);

getNewOutlet('articleCategories', defaultCats, {autoDelete: false});
getNewOutlet('articleCategoryDisplayMap', buildCatDisplayMap(defaultCats), {
  autoDelete: false,
});
getNewOutlet(
  'articleSortOptions',
  [
    {name: '-created', display: '發布時間(由新到舊)'},
    {name: 'created', display: '發布時間(由舊到新)'},
  ],
  {autoDelete: false},
);
