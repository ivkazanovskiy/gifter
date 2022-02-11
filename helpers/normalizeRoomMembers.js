function normalizeRoomMembers(roomMembers) {
  roomMembers.map((el, i, arr) => {
    const newEl = {};
    newEl.id = el['Users.id'];
    newEl.name = el['Users.name'];
    arr[i] = newEl;
  });
}

module.exports = normalizeRoomMembers;
