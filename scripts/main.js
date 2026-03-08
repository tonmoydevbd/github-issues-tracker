const nameEl = document.querySelector('#name');
const passwordEl = document.querySelector('#password');
const signInBtn = document.querySelector('#sign-in-btn');
const errorMessage = document.querySelector('.error-message');

signInBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const isValidName = nameEl.value === 'admin';
  const isValidPassword = passwordEl.value === 'admin123';
  if (isValidName && isValidPassword) {
    window.location.assign('./dashboard.html');
  } else {
    errorMessage.classList.remove('hide');
    nameEl.value = '';
    passwordEl.value = '';
    return;
  }
})