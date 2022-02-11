function normalizeMembers(members, crewId) {
  members.map((el, i, arr) => {
    const newEl = {};
    newEl.memberId = el.id;
    newEl.name = el.name;
    newEl.crewId = crewId;
    arr[i] = newEl;
  });
}

module.exports = normalizeMembers;
