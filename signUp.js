const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const signUpBTN = document.querySelector("#signUpBtn");

function handleSignUp(event) {
  event.preventDefault(); // Prevent default form submission behavior (if applicable)

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return; // Early exit if fields are empty
  }

  const url = `http://wahoo.us-east-1.elasticbeanstalk.com/user/addUser/${username}/${password}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then(data => {
      if (data.exists === true) {
        alert(`Username "${username}" is already taken. Please choose a different one.`);
      } else {
        localStorage.setItem('placesVisited', JSON.stringify([])); // Initialize empty placesVisited
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('username', username);
        window.location.href = 'https://wahoowanderings.co';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Sign-up failed. Please try again later.');
    });
}

document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    handleSignUp(event); // Pass the event object for potential form handling
  }
});

signUpBTN.addEventListener('click', handleSignUp);
