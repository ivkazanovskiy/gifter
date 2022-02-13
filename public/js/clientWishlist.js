const { newWishForm } = document;
const wishList = document.querySelector('.wishList');
let deleteWishButton = document.querySelectorAll('.deleteWishButton');

function addWish(wish, wishId) {
  const newLine = document.createElement('li');
  newLine.id = `wish-${wishId}`;
  const newWishText = document.createElement('div');
  newWishText.classList.add('wishText');
  newWishText.innerText = wish;
  const newDeleteWishButton = document.createElement('button');
  newDeleteWishButton.innerText = 'Delete';
  newDeleteWishButton.type = 'submit';
  newDeleteWishButton.dataset.wish_id = wishId;
  newDeleteWishButton.classList.add('deleteWishButton');

  newLine.appendChild(newWishText);
  newLine.appendChild(newDeleteWishButton);
  wishList.appendChild(newLine);
}

function deleteWish(wishId) {
  const wish = document.getElementById(`wish-${wishId}`);
  wish.remove();
}

function listenDeleteButton() {
  deleteWishButton?.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const wishId = event.target.dataset.wish_id;

      const response = await fetch(`/wishlist/delete/${wishId}`, {
        method: 'delete',
      }).then((data) => data.json());

      let outerText;
      switch (response.message) {
        case 'deleted':
          deleteWish(wishId);
          break;
        case 'unauthorized':
          window.location.href = '/login';
          break;
        default:
          outerText = response.message;
          break;
      }

      if (outerText) document.getElementById('responseMessage').innerText = outerText;
    });
  });
}

newWishForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const wish = event.target.wish.value;

  const response = await fetch('/wishlist/new', {
    method: 'post',
    body: JSON.stringify({ wish }),
    headers: { 'Content-Type': 'application/json' },
  }).then((data) => data.json());

  let outerText;
  switch (response.message) {
    case 'saved':
      newWishForm.wish.value = '';
      addWish(wish, response.wishId);
      deleteWishButton = document.querySelectorAll('.deleteWishButton');
      listenDeleteButton();
      break;
    case 'unauthorized':
      window.location.href = '/login';
      break;
    default:
      outerText = response.message;
      break;
  }

  if (outerText) document.getElementById('responseMessage').innerText = outerText;
});

listenDeleteButton();
