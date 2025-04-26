// Smooth page navigation
function navigate(page) {
  switch (page) {
    case 'account':
      window.location.href = 'account.html';
      break;
    case 'stats':
      window.location.href = 'stats.html';
      break;
    case 'rewards':
      window.location.href = 'rewards.html';
      break;
    case 'home':
      window.location.href = 'index.html';
      break;
    default:
      alert('🚧 Coming Soon!');
  }
}

// When page loads
window.onload = function() {
  if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.ready();

    const user = Telegram.WebApp.initDataUnsafe?.user || {};

    if (user.username) {
      document.getElementById('username').textContent = '@' + user.username;
    } else {
      document.getElementById('username').textContent = '@Unknown';
    }

    if (user.id) {
      document.getElementById('userId').textContent = user.id;
      fetchBalance(user.id);
    } else {
      document.getElementById('userId').textContent = 'Unknown';
      showError('⚠️ Cannot detect user ID.');
    }
  } else {
    showError('⚠️ Telegram WebApp not detected.');
  }
}

// Fetch user's balance securely
function fetchBalance(userId) {
  const apiUrl = `https://t.me/TestDriveInPussy_bot/api_get_balance?user_id=${userId}`;

  // Show loading
  setLoading(true);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        showError('⚠️ ' + data.error);
      } else {
        document.getElementById('balance').textContent = `${formatMoney(data.balance)} USD`;
        document.getElementById('demoBalance').textContent = `${formatMoney(data.demo_balance)} USD`;
      }
    })
    .catch(error => {
      console.error('Balance Fetch Error:', error);
      showError('⚠️ Network or server error.');
    })
    .finally(() => {
      setLoading(false);
    });
}

// Format number nicely
function formatMoney(amount) {
  return Number(amount).toFixed(2);
}

// Show error alert
function showError(message) {
  alert(message);
}

// Loading indicator (optional spinner later)
function setLoading(isLoading) {
  const balanceElem = document.getElementById('balance');
  const demoElem = document.getElementById('demoBalance');
  
  if (isLoading) {
    balanceElem.textContent = 'Loading...';
    demoElem.textContent = 'Loading...';
  }
}