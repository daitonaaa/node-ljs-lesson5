document.title = 'Registration';

function setLoadingStatus(status) {
  const button = document.getElementById('sumbit');

  button.disabled = status;
  button.innerText = status ? 'Please wait...' : 'Regitration';
}

function reg(e) {
  e.preventDefault();
  setLoadingStatus(true);

  removeAlerts();

  const form = {};
  const data = new FormData(this);

  data.forEach((value, field) => {
    form[field] = value;
  });

  if (form.password !== form.confirmPassword) {
    addAlert('Passwords do not match', 'danger');
    setLoadingStatus(false);
    return;
  }

  delete form.confirmPassword;

  return Request('POST', '/registration', form, [
    {name: 'Content-Type', value: 'application/json'}
  ])
    .then(async (data) => {
      if (data.status === 200) {
        addAlert(`Okay ${form.displayName}, you have successfully registered, it remains to confirm the mail`);
        this.reset();
        setLoadingStatus(false);
      }
    })
    .catch((e) => {
      addAlert(e.responseText, 'danger')
      setLoadingStatus(false);
    });

};

window.onload = function () {
  const regForm = document.getElementById('reg-form');

  regForm.onsubmit = reg;
};
