// Get reference to the form elements
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submit-button');

// Define the login function
function login() {
    // Check if the username and password are empty
    if (usernameInput.value === '' || passwordInput.value === '') {
        return false;
    }

    // Validate the username and password
    const username = usernameInput.value.toLowerCase();
    const password = passwordInput.value;
    if (!validateUsernameAndPassword(username, password)) {
        return false;
    }

    // Make a POST request to the server to log in the user
    fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `
username = $ { username } & password = $ { password }
`
        })
        .then(response => response.ok)
        .then(() => {
            // Redirect the user to the main page after logging in
            window.location.href = '/';
        })
        .catch(error => console.error(error));
}

// Define the validateUsernameAndPassword function
function validateUsernameAndPassword(username, password) {
    // Check if the username is valid (must be at least 3 characters long)
    if (username.length < 3) {
        return false;
    }

    // Check if the password is valid (must be at least 6 characters long and contain at least one uppercase letter,
    // one lowercase letter, and one number)
    const regex = /^[a-zA-Z0-9]{'6,}$/;
    if (!regex.test(password)) {
        return false;
    }

    return true;
}

// Add event listener to the submit button
submitButton.addEventListener('click', login);

function searchMedicine() {
    document.getElementById("searchButton").addEventListener("click", searchMedicine);
    var searchInput = document.getElementById("searchInput");
    var searchQuery = searchInput.value.toLowerCase();
    var medicineList = document.querySelector(".medicine-list li");
    for (var i = 0; i < medicineList.length; i++) {
        var medicineItem = medicineList[i];
        if (medicineItem.innerHTML.toLowerCase().includes(searchQuery)) {
            medicineItem.style.display = "block";
        } else {
            medicineItem.style.display = "none";
        }
    }
    searchInput.value = ""; // Clear the search input field
}