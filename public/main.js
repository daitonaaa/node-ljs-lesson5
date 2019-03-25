"use-strict"

async function logout() {
  await Request('POST', '/logout');
  location.reload();
}

function insertUserInfo(text, className) {
  const el = document.createElement('div');
  el.className = className || '';
  el.innerText = text;

  document.querySelector('.user-info').append(el);
}

function renderUser(data) {
  const user = JSON.parse(data.response);

  insertUserInfo(user.displayName, 'user-info__name');
  insertUserInfo(user.email);

  document.title = user.displayName.toUpperCase();
}


(function () {
  document.title = 'Wait....';

  const logoutButton = document.getElementById('logout');
  logoutButton.onclick = logout;

  setTimeout(() => {
    Request('GET', '/users/me').then(renderUser).catch((err) => {
      throw err;
    });
  }, 0);
})();

