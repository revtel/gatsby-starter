function mapLineBreak(text) {
  return (text || '').replace(/\n/g, '<br/>');
}

module.exports = {
  mapLineBreak,
};
