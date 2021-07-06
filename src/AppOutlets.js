import {getNewOutlet} from 'reconnect.js';
import * as CustomCategories from '../custom/categories';
import * as CustomSortOptions from '../custom/sortOptions';
import {buildCatDisplayMap} from './Utils/buildCatDisplayMap';

const categories = CustomCategories.getCategories();
const categoryDisplayMap = buildCatDisplayMap(categories);
const sortOptions = CustomSortOptions.getSortOptions();

getNewOutlet('user', null, {autoDelete: false});
getNewOutlet('loading', false, {autoDelete: false});
getNewOutlet('login-modal', false, {autoDelete: false});
getNewOutlet('contact-modal', false, {autoDelete: false});
getNewOutlet('reset-password-modal', false, {autoDelete: false});
getNewOutlet('categories', categories, {autoDelete: false});
getNewOutlet('categoryDisplayMap', categoryDisplayMap, {autoDelete: false});
getNewOutlet('sortOptions', sortOptions, {autoDelete: false});
getNewOutlet(
  'cart',
  {
    items: [],
    config: {
      name: 'whitedog',
      addr: 'office address',
      mobile: '0911222333',
      email: 'whitedogg13@gmail.com',
    },
  },
  {autoDelete: false},
);
getNewOutlet('actions', null, {autoDelete: false});
