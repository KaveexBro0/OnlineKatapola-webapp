window.onload = function() {
  if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.ready();

    const initDataUnsafe = Telegram.WebApp.initDataUnsafe || {};
    const user = initDataUnsafe.user || {};

    if (user.username) {
      document.getElementById('username').textContent = '@' + user.username;
    } else {
      document.getElementById('username').textContent = '@Unknown';
    }

    if (user.id) {
      document.getElementById('userId').textContent = user.id;
    } else {
      document.getElementById('userId').textContent = 'Unknown ID';
    }

    // Now fetch balance via your Bot API
    fetchBalance(user.id);
  }
}

function fetchBalance(userId) {
  // Example API endpoint you must create in TBC bot
  fetch(`https://yourdomain.com/get_balance?user_id=${userId}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('balance').textContent = data.balance + ' USD';
      document.getElementById('demoBalance').textContent = data.demo_balance + ' USD';
    })
    .catch(error => {
      console.error('Balance Fetch Error:', error);
    });
}