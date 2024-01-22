let dropdownVisible = false;

function toggleDropdown() {
  const dropdownContent = document.querySelector('.dropdown-content');
  dropdownVisible = !dropdownVisible;

  if (dropdownVisible) {
    dropdownContent.style.display = 'block';
  } else {
    dropdownContent.style.display = 'none';
  }
}

document.addEventListener('click', function (event) {
  const dropdownButton = document.querySelector('.arrow');
  const dropdownContent = document.querySelector('.dropdown-content');

  if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
    dropdownContent.style.display = 'none';
    dropdownVisible = false;
  }
});


  