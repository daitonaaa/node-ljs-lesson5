"use-strict"


function Request(method, url, data, headers = []) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);

  if (headers.length > 0) headers.forEach(item => {
    xhr.setRequestHeader(item.name, item.value);
  });

  return new Promise((resolve, reject) => {
    data ? xhr.send(JSON.stringify(data)) : xhr.send();

    xhr.onreadystatechange = function () {
      if (this.readyState != 4) return;
      else this.status === 200 ? resolve(this) : reject(this);
    }
  })
}

function addAlert(errorText, type = 'success') {
  const el = document.createElement('div');
  el.className = `error alert alert-${type}`;
  el.innerText = errorText;

  document.querySelector('.container').append(el);
}

function removeAlerts() {
  const els = document.querySelectorAll('.error');

  Array.prototype.forEach.call(els, (el) => el.remove());
}
