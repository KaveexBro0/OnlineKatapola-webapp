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

window.onload = function() {
  if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.ready();
    console.log('✅ Telegram WebApp detected');

    const user = Telegram.WebApp.initDataUnsafe?.user || {};

    if (user.username) {
      document.getElementById('username').textContent = '@' + user.username;
    }
    if (user.id) {
      document.getElementById('userId').textContent = user.id;
      fetchBalance(user.id);
    }
  } else {
    console.warn('⚠️ Telegram WebApp not detected.');
    showError('Please open through Telegram WebApp.');
  }
}

function fetchBalance(userId) {
  const apiUrl = `https://your-api-domain.com/api/get_balance?user_id=${userId}`; // Replace with real endpoint!

  setLoading(true);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error('Network response not ok');
      return response.json();
    })
    .then(data => {
      if (data.error) {
        showError(data.error);
      } else {
        document.getElementById('balance').textContent = formatMoney(data.balance) + ' USD';
        document.getElementById('demoBalance').textContent = formatMoney(data.demo_balance) + ' USD';
      }
    })
    .catch(error => {
      console.error('Error fetching balance:', error);
      showError('Failed to fetch balance.');
    })
    .finally(() => {
      setLoading(false);
    });
}

function formatMoney(amount) {
  return Number(amount).toFixed(2);
}

function showError(message) {
  alert(message);
}

function setLoading(isLoading) {
  document.getElementById('balance').textContent = isLoading ? 'Loading...' : '0.00 USD';
  document.getElementById('demoBalance').textContent = isLoading ? 'Loading...' : '0.00 USD';
}