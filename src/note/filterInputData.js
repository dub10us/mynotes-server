function filterInputData(data) {
  const filtered = {};

  if (data.x) {
    filtered.x = data.x;
    if (filtered.x > 1.0) { filtered.x = 1.0; }
    if (filtered.x < 0.0) { filtered.x = 0.0; }
  }
  if (data.y) {
    filtered.y = data.y;
    if (filtered.y > 1.0) { filtered.y = 1.0; }
    if (filtered.y < 0.0) { filtered.y = 0.0; }
  }
  if (data.z !== undefined) {
    filtered.z = data.z;
    if (filtered.z > 9999) { filtered.z = 9999; }
    if (filtered.z < 0) { filtered.z = 0; }
  }
  if (data.color) {
    filtered.color = data.color;
  }
  if (data.content) {
    filtered.content = data.content;
  }

  return filtered;
}

module.exports = filterInputData;
