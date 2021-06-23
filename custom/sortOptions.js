const sortOptions = [
  {name: '-created', display: '上架時間(由新到舊)'},
  {name: 'price', display: '價格(由低到高)'},
  {name: 'created', display: '上架時間(由舊到新)'},
  {name: '-price', display: '價格(由高到低)'},
];

function getSortOptions() {
  return sortOptions;
}

export {getSortOptions};
