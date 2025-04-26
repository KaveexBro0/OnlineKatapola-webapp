function navigate(page) {
  switch(page) {
    case 'account':
      window.location.href = 'account.html';
      break;
    case 'stats':
      window.location.href = 'stats.html'; // You can create this page later
      break;
    case 'rewards':
      window.location.href = 'rewards.html'; // You can create this page later
      break;
    case 'home':
      window.location.href = 'index.html';
      break;
    default:
      alert('Coming Soon!');
  }
}