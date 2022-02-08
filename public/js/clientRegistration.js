const { registrationForm } = document;
registrationForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  let outerText;

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
    repeatPassword: { value: repeatPassword },
  } = event.target;

  if (password !== repeatPassword) {
    outerText = 'Пароли не совпадают';
  } else {
    const response = await fetch(url, {
      method,
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    }).then((data) => data.json());

    switch (response) {
      case 'added':
        window.location.href = '/';
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
  }
  if (outerText) document.getElementById('responseMessage').innerText = outerText;
});
