import {getNewOutlet} from 'reconnect.js';
import {buildCatDisplayMap} from '../Utils/buildCatDisplayMap';

const sortOptions = [
  {name: '-created', display: '上架時間(由新到舊)'},
  {name: 'price', display: '價格(由低到高)'},
  {name: 'created', display: '上架時間(由舊到新)'},
  {name: '-price', display: '價格(由高到低)'},
];

const categories = [
  {
    name: 'A',
    display: 'Cat A',
    items: [
      {
        name: 'A-a',
        display: 'Cat A-a',
        items: [
          {name: 'A-a-1', display: 'Cat A-a-1'},
          {name: 'A-a-2', display: 'Cat A-a-2'},
          {name: 'A-a-3', display: 'Cat A-a-3'},
        ],
      },
      {name: 'A-b', display: 'Cat A-b'},
      {name: 'A-c', display: 'Cat A-c'},
    ],
  },
  {
    name: 'B',
    display: 'Cat B',
  },
  {
    name: 'C',
    display: 'Cat C',
    items: [
      {name: 'C-a', display: 'Cat C-a'},
      {name: 'C-b', display: 'Cat C-b'},
      {name: 'C-c', display: 'Cat C-c'},
    ],
  },
];

getNewOutlet('user', null, {autoDelete: false});
getNewOutlet('loading', false, {autoDelete: false});
getNewOutlet('login-modal', false, {autoDelete: false});
getNewOutlet('contact-modal', false, {autoDelete: false});
getNewOutlet('reset-password-modal', false, {autoDelete: false});
getNewOutlet('categories', categories, {autoDelete: false});
getNewOutlet('categoryDisplayMap', buildCatDisplayMap(categories), {
  autoDelete: false,
});
getNewOutlet('sortOptions', sortOptions, {autoDelete: false});
getNewOutlet(
  'cart',
  {
    items: [],
    extra_items: [],
    discount_items: [],
  },
  {autoDelete: false},
);
getNewOutlet('actions', null, {autoDelete: false});
getNewOutlet('ApiUtil', {}, {autoDelete: false});
