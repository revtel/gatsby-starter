function updateQuries({keys, params, options}) {
  const nextParams = {...params};
  const queries = [];

  for (const key of keys) {
    if (options[key] !== undefined) {
      if (options[key] === '') {
        delete nextParams[key];
      } else {
        nextParams[key] = options[key];
      }
    }
  }

  for (const key of keys) {
    if (nextParams[key]) {
      queries.push(`${key}=${nextParams[key]}`);
    }
  }

  if (queries.length > 0) {
    return `?${queries.join('&')}`;
  }

  return '';
}

export {updateQuries};
