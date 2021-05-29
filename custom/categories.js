const exampleCategories = [
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

function getCategories() {
  return exampleCategories;
}

export {getCategories};
