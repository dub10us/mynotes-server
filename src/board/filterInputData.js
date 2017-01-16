function filterInputData(data) {
  const filtered = {};

  if (data.name) {
    filtered.name = data.name;
  }

  return filtered;
}

module.exports = filterInputData;
