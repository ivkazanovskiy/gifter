const { loginForm } = document;
loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const clearValues = () => {
    loginForm.email.value = '';
    loginForm.password.value = '';
  };

  const {
    action: url,
    method,
    email: { value: email },
    password: { value: password },
  } = event.target;

  const response = await fetch(url, {
    method,
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  }).then((data) => data.json());

  let outerText;
  switch (response.message) {
    case 'authorized':
      outerText = 'Авторизация пройдена';
      clearValues();
      break;
    case 'incorrectPassword':
      outerText = 'Неправильный пароль';
      loginForm.password.value = '';
      break;
    case 'notFound':
      outerText = 'Пользователь с таким e-mail не найден';
      loginForm.email.value = '';
      break;
    default:
      outerText = response;
      break;
  }

  document.getElementById('responseMessage').innerText = outerText;
});
