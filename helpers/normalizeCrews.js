function normalizeCrews(crews) {
  crews.map((el, i, arr) => {
    const newEl = {};
    newEl.name = el['Crews.name'];
    newEl.id = el['Crews.id'];
    arr[i] = newEl;
  });
}

module.exports = normalizeCrews;
