function mapLineBreak(text) {
  return (text || '').replace(/\n/g, '<br/>');
}

function formatDate(timestamp) {
  try {
    return new Date(timestamp).toISOString().split('T')[0];
  } catch (ex) {
    return null;
  }
}

module.exports = {
  mapLineBreak,
  formatDate,
};
