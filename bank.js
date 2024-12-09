let balance = 0;
let transactions = [];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate successful login
    if (username && password) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('banking-dashboard').style.display = 'block';
        document.getElementById('user-name').innerText = username;
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    } else {
        document.getElementById('login-message').innerText = 'Please enter valid credentials';
    }
}

function updateBalanceDisplay() {
    document.getElementById('balance').innerText = balance.toFixed(2);
    updateTransactionList();
}

function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        transactions.push(`Deposited: ₹${amount.toFixed(2)}`);
        document.getElementById('amount').value = '';
        updateBalanceDisplay();
    } else {
        alert("Please enter a valid amount to deposit.");
    }
}

function withdraw() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
        balance -= amount;
        transactions.push(`Withdrew: ₹${amount.toFixed(2)}`);
        document.getElementById('amount').value = '';
        updateBalanceDisplay();
    } else if (amount > balance) {
        alert("Insufficient funds.");
    } else {
        alert("Please enter a valid amount to withdraw.");
    }
}

function updateTransactionList() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerText = transaction;
        transactionList.appendChild(li);
    });
}
let users = {}; // Stores account data
let currentUser = null;

// Login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (users[username] && users[username].password === password) {
        currentUser = username;
        document.getElementById("user-name").innerText = username;
        document.getElementById("balance").innerText = users[username].balance;
        document.getElementById("login-form").style.display = "none";
        document.getElementById("banking-dashboard").style.display = "block";
        document.getElementById("transaction-list").innerHTML = ""; // Clear the transaction history
    } else {
        document.getElementById("login-message").innerText = "Invalid username or password.";
    }
}

// Create account function
function createAccount() {
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;

    if (!users[username]) {
        users[username] = { password: password, balance: 0, transactions: [] };
        document.getElementById("create-account-message").innerText = "Account created successfully!";
        showLogin();
    } else {
        document.getElementById("create-account-message").innerText = "Username already exists.";
    }
}

// Show the create account form
function showCreateAccount() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("create-account-form").style.display = "block";
}

// Show the login form
function showLogin() {
    document.getElementById("create-account-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

// Deposit function
function deposit() {
    const amount = parseFloat(document.getElementById("amount").value);
    
    if (amount > 0) {
        users[currentUser].balance += amount;
        users[currentUser].transactions.push(`Deposited ₹${amount}`);
        document.getElementById("balance").innerText = users[currentUser].balance;
        document.getElementById("amount").value = "";
    }
}

// Withdraw function
function withdraw() {
    const amount = parseFloat(document.getElementById("amount").value);
    
    if (amount > 0 && users[currentUser].balance >= amount) {
        users[currentUser].balance -= amount;
        users[currentUser].transactions.push(`Withdrew ₹${amount}`);
        document.getElementById("balance").innerText = users[currentUser].balance;
        document.getElementById("amount").value = "";
    }
}

// Show transaction history
function showTransactionHistory() {
    const transactions = users[currentUser].transactions;
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        const li = document.createElement("li");
        li.textContent = transaction;
        transactionList.appendChild(li);
    });

    document.getElementById("transaction-history").style.display = "block";
}

// Close transaction history
function hideTransactionHistory() {
    document.getElementById("transaction-history").style.display = "none";
}

// Show balance
function showBalance() {
    alert(`Your current balance is ₹${users[currentUser].balance}`);
}

// Logout function
function logout() {
    currentUser = null;
    document.getElementById("banking-dashboard").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("transaction-list").innerHTML = ""; // Clear the transaction history
}