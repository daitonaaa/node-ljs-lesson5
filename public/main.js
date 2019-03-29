"use-strict"

document.title = 'Wait....';


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

function socketInit() {
  const socket = io();

  socket
    .on('error', (message) => {
      console.error(message);
    })
    .on('logout', () => {
      socket.disconnect();
      location.reload();
    });
}

function userInit(data) {
  const user = JSON.parse(data.response);

  insertUserInfo(user.displayName, 'user-info__name');
  insertUserInfo(user.email, 'user-info__email');

  document.title = user.displayName.toUpperCase();
}


window.onload = function () {
  const logoutButton = document.getElementById('logout');
  logoutButton.onclick = logout;

  return Request('GET', '/users/me')
    .then((data) => {
      userInit(data);
      socketInit();
    })
    .catch((err) => {
      throw err;
    });
};
