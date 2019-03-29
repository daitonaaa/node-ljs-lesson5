"use-strict"

document.title = 'Go to login';


function render(template) {
  document.write(template);
}

function login(e) {
  e.preventDefault();
  removeAlerts();

  const form = {};
  const data = new FormData(this);

  data.forEach((value, field) => {
    form[field] = value;
  });

  return Request('POST', '/login', form, [
    {name: 'Content-Type', value: 'application/json'}
  ])
    .then(async (data) => {
      if (data.status === 200) location.reload();
      else addAlert(data.responseText, 'danger');
    })
    .catch((e) => {
      addAlert(e.responseText, 'danger')
    });
};


window.onload = function () {
  const loginForm = document.getElementById('login-form');

  loginForm.onsubmit = login;
};
