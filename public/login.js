"use-strict"

document.title = 'Go to login';


function addError(errorText) {
  const el = document.createElement('div');
  el.className = 'error alert alert-danger';
  el.innerText = errorText;

  document.querySelector('.container').append(el);
}

function removeErrors() {
  const els = document.querySelectorAll('.error');

  Array.prototype.forEach.call(els, (el) => el.remove());
}

function render(template) {
  document.write(template);
}

function login(e) {
  e.preventDefault();
  removeErrors();

  const form = {};
  const data = new FormData(this);

  data.forEach((value, field) => {
    form[field] = value;
  });

  return Request('POST', '/login', form, [
    {name: 'Content-Type', value: 'application/json'}
  ])
    .then(async (data) => {
      const template = await Request('GET', '/');

      render(template.response);
    })
    .catch((e) => {
      addError(e.responseText)
    });
};


window.onload = function () {
  const loginForm = document.getElementById('login-form');

  loginForm.onsubmit = login;
};
