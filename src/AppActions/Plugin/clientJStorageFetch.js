import PluginAction from '../PluginAction';
import {JStorage} from 'rev.sdk.js';

export default class Plugin extends PluginAction {
  shouldExecute(...args) {
    return true;
  }

  async executeAsync(...args) {
    const [collection, {cat, q, search, sort}] = args;

    //"q" can defined custom query by project
    let catQuery;
    if (cat) {
      const region = cat.split('-')[0];
      const attribute = cat.split('-')[1];
      catQuery = {
        $and: attribute
          ? [
              {
                region: {$regex: region},
              },
              {
                attribute: {$regex: attribute},
              },
            ]
          : [
              {
                region: {$regex: region},
              },
            ],
      };
    } else {
      catQuery = {};
    }
    const searchQuery = search ? {searchText: {$regex: search}} : {};
    const sortValue = sort ? [sort] : ['-created'];
    const extraQueries = {};
    let projection = null;

    if (collection === 'product') {
      extraQueries.public = true;
    } else if (collection === 'Article_Default') {
      delete catQuery.labels;
      if (!cat) {
        catQuery.label = 'blog';
      } else {
        catQuery.label = {$regex: cat};
      }
      projection = {content: 0};
    }

    const resp = await JStorage.fetchDocuments(
      collection,
      {
        ...catQuery,
        ...searchQuery,
        ...extraQueries,
      },
      sortValue,
      null, // no paging for now, since our EC products shouldn't be too much
      projection, // if we're fetching Article, ignore the content
      {anonymous: true},
    );

    return resp;
  }
}
