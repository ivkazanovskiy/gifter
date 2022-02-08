const { editForm } = document;

editForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {
    action: url,
    email: { value: email },
    name: { value: name },
  } = event.target;

  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ email, name }),
    headers: { 'Content-Type': 'application/json' },
  }).then((data) => data.json());
  console.log(response.message);

  let outerText;
  switch (response.message) {
    case 'authError':
      window.location.href = '/logout';
      break;
    case 'saved':
      outerText = 'Данные изменены';
      break;
    case 'incorrect':
      outerText = 'Введите корректные данные';
      break;
    default:
      outerText = response.message;
      break;
  }

  if (outerText) document.getElementById('responseMessage').innerText = outerText;
});
