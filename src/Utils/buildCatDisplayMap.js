function buildCatDisplayMap(categories) {
  const resultMap = {};
  for (const topLevel of categories) {
    resultMap[topLevel.name] = topLevel.display;
    if (topLevel.items?.length > 0) {
      for (const secondLevel of topLevel.items) {
        resultMap[secondLevel.name] = secondLevel.display;
        if (secondLevel.items?.length > 0) {
          for (const thirdLevel of secondLevel.items) {
            resultMap[thirdLevel.name] = thirdLevel.display;
          }
        }
      }
    }
  }
  return resultMap;
}

export {buildCatDisplayMap};
