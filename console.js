function handleInput() {
      var inputElement = document.getElementById('input');
      var command = inputElement.value;
      var consoleElement = document.getElementById('console');
      consoleElement.innerHTML += '> ' + command + '<br>';
      inputElement.value = '';
}