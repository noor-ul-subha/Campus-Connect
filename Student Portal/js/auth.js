const form = document.getElementById('authForm');
const isLoginPage = Boolean(document.getElementById('username'));

if (localStorage.getItem('campusConnectDemoUser') === 'Noor Ul Subha' && (isLoginPage || location.pathname.endsWith('signup.html'))) {
  // Do not redirect signup automatically; let users view it if they choose.
}

if (form && isLoginPage) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const error = document.getElementById('loginError');

    if (username.toLowerCase() === 'student' && password === 'CUI@2026') {
      localStorage.setItem('campusConnectDemoUser', 'Noor Ul Subha');
      window.location.href = 'index.html';
    } else {
      error.hidden = false;
    }
  });
}

if (form && !isLoginPage) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('Account registration will be available when the backend is connected. Use the demo credentials on the Login page.');
    window.location.href = 'login.html';
  });
}

const forgotLink = document.getElementById('forgotLink');
if (forgotLink) {
  forgotLink.addEventListener('click', event => {
    event.preventDefault();
    alert('Password recovery will be available after backend integration.');
  });
}
