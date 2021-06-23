function removeAutoFields(doc) {
  const clone = {...doc};
  delete clone._id;
  delete clone.id;
  delete clone.created;
  delete clone.updated;
  return clone;
}

module.exports = {
  removeAutoFields,
};
