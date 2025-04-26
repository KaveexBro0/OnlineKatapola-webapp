// Fake Example Data (You will later replace with real API data)
const userData = {
  username: "@OnlineKatapola",
  userId: "123456789",
  balance: 15.75,
  demoBalance: 3.50
};

function playDice() {
  alert('🎲 Dice roll coming soon!');
}

function withdraw() {
  alert('💸 Withdrawal feature coming soon!');
}

function navigate(page) {
  switch(page) {
    case 'account':
      window.location.href = 'account.html';
      break;
    case 'stats':
      window.location.href = 'stats.html';
      break;
    case 'rewards':
      window.location.href = 'rewards.html';
      break;
    case 'deposit':
      alert('Deposit Page Coming Soon!');
      break;
    case 'withdraw':
      alert('Withdraw Page Coming Soon!');
      break;
    case 'settings':
      alert('Settings Page Coming Soon!');
      break;
    case 'home':
    default:
      window.location.href = 'index.html';
  }
}

// If on Account Page => Load User Data
window.onload = function() {
  if (document.getElementById('username')) {
    document.getElementById('username').textContent = userData.username;
    document.getElementById('userId').textContent = userData.userId;
    document.getElementById('balance').textContent = userData.balance.toFixed(2) + ' USD';
    document.getElementById('demoBalance').textContent = userData.demoBalance.toFixed(2) + ' USD';
  }
}