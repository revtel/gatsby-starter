import {getNewOutlet} from 'reconnect.js';
import {buildCatDisplayMap} from '../Utils/buildCatDisplayMap';

// configurations for "product" collection
const sortOptions = [
  {name: '-created', display: '上架時間(由新到舊)'},
  {name: 'price', display: '價格(由低到高)'},
  {name: 'created', display: '上架時間(由舊到新)'},
  {name: '-price', display: '價格(由高到低)'},
];

const categories = [
  {
    name: 'theme',
    display: '主題商品',
    image:
      'https://images.pexels.com/photos/6850740/pexels-photo-6850740.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    name: 'custom',
    display: '客製商品',
    image:
      'https://images.pexels.com/photos/6624333/pexels-photo-6624333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  // {
  //   name: 'A',
  //   display: 'Cat A',
  //   items: [
  //     {
  //       name: 'A-a',
  //       display: 'Cat A-a',
  //       items: [
  //         {name: 'A-a-1', display: 'Cat A-a-1'},
  //         {name: 'A-a-2', display: 'Cat A-a-2'},
  //         {name: 'A-a-3', display: 'Cat A-a-3'},
  //       ],
  //     },
  //     {name: 'A-b', display: 'Cat A-b'},
  //     {name: 'A-c', display: 'Cat A-c'},
  //   ],
  // },
  // {
  //   name: 'B',
  //   display: 'Cat B',
  // },
  // {
  //   name: 'C',
  //   display: 'Cat C',
  //   items: [
  //     {name: 'C-a', display: 'Cat C-a'},
  //     {name: 'C-b', display: 'Cat C-b'},
  //     {name: 'C-c', display: 'Cat C-c'},
  //   ],
  // },
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
