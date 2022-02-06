const { registrationForm } = document;
registrationForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const clearValues = () => {
    registrationForm.name.value = '';
    registrationForm.email.value = '';
    registrationForm.password.value = '';
  };

  const {
    action: url,
    method,
    name: { value: name },
    email: { value: email },
    password: { value: password },
  } = event.target;

  const response = await fetch(url, {
    method,
    body: JSON.stringify({ name, email, password }),
    headers: { 'Content-Type': 'application/json' },
  }).then((data) => data.json());

  let outerText;
  switch (response) {
    case 'added':
      outerText = 'Вы успешно зарегестрированны';
      clearValues();
      break;
    case 'changeEmail':
      outerText = 'Пользователь с таким e-mail уже существует';
      registrationForm.email.value = '';
      break;
    case 'incorrect':
      outerText = 'Введите корректные данные';
      break;
    default:
      outerText = response;
      break;
  }

  document.getElementById('responseMessage').innerText = outerText;
});
