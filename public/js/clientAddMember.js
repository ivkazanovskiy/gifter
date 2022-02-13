const { addMemberForm } = document;

addMemberForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const {
    action: url,
    method,
    memberId: { value: memberId },
  } = event.target;

  const response = await fetch(url, {
    method,
    body: JSON.stringify({ memberId }),
    headers: { 'Content-Type': 'application/json' },
  }).then((data) => data.json());

  let outerText;
  switch (response.message) {
    case 'saved':
      addMemberForm.memberId.value = '';
      outerText = `Member ${memberId} has been added`;
      break;
    case 'повторяющееся значение ключа нарушает ограничение уникальности "CrewMembers_pkey"':
      outerText = 'Member has already been added';
      break;
    case 'INSERT или UPDATE в таблице "CrewMembers" нарушает ограничение внешнего ключа "CrewMembers_userId_fkey"':
      outerText = 'This user does not exist';
      break;
    default:
      outerText = response.message;
      break;
  }

  if (outerText) document.getElementById('responseMessage').innerText = outerText;
});
