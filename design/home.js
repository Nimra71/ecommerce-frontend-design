document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.trim().toLowerCase();
    const resultDiv = document.getElementById('searchResult');
    
    if (searchTerm) {
      resultDiv.textContent = `Searching for "${searchTerm}"...`;
    } else {
      resultDiv.textContent = '';
    }
  });

  document.getElementById('searchButton').addEventListener('click', function () {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('searchResult');

    if (searchTerm) {
      resultDiv.textContent = `You searched for "${searchTerm}".`;
    } else {
      resultDiv.textContent = 'Please enter a search term.';
    }
  });

  window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth;
    const nav = document.querySelector('nav');

    if (screenWidth < 768) {
        nav.classList.add('mobile-nav');
    } else {
        nav.classList.remove('mobile-nav');
    }
});