
// GLOBAL VARIABLES //

// Array of all accounts that have been created
let arrAccounts = [] 
// Account associated with current owner name, as displayed on webpage
let currentAccount 

// USER DEFINED CLASSES //

// Create a function called bankAccount that accepts a single parameter: ownerName.
// Add local variables balance and owner. Owner is set by incoming parameter.
// Return an object with methods for: 
// - withdrawal that accepts a parameter (amount), 
// - deposit that accepts a parameter (amount), 
// - getBalance(), and 
// - getOwnerName().
// Add validation to ensure only appropriate withdrawals and deposits are allowed.
// The balance and ownerName methods return values of the private variables.
// The withdrawal function withdraws money from the owner’s bank account 
// and updates the balance.
// The deposit function adds money to the owner’s bank account
// and updates the balance.

// Object that stores bank account owner name and balance.
// Allows withdrawals and deposits.
// Owner name serves as unique account id.
let bankAccount = function(ownerName) {
    console.log("creating bankAccount for owner name: " + ownerName)
    const _ownerName = ownerName
    let _balance = 0
    const bankAccountHandle = function() {
        this.getBalance = function() {
            return _balance
        }
        this.getOwnerName = function() {
            return _ownerName
        }
        this.withdraw = function(amount) {
            _balance = _balance - amount
        }
        this.deposit = function(amount) {
            _balance = _balance + amount
        }
    }
    return new bankAccountHandle()
}

// DOM ELEMENTS //

let btnName = document.getElementById("name")
let btnWithdrawal = document.getElementById("withdrawal")
let btnDeposit = document.getElementById("deposit")
let divShowAccountInfo = document.getElementById("divShowAccountInfo")

// FUNCTIONS //

// We have no current account yet to work with,
// so disable withdrawal and deposit buttons.
function init() {
    currentAccount = null
    btnWithdrawal.disabled = true;
    btnDeposit.disabled = true;
}
// Prompt for account owner name.
// Make account with this owner name the current account, by either
// finding existing account or creating new account with zero balance.
// Display account info: name and balance.
// Enable withdrawal and deposit buttons.
function handleAccountName() {
    console.log("in handleAccountName()")
    let ownerName = prompt("Enter name (first last):")
    if (ownerName) {
        currentAccount = findAccount(ownerName)
        showAccountInfo(currentAccount)
        btnWithdrawal.disabled = false;
        btnDeposit.disabled = false;
    }
}
// Prompt for deposit amount.
// If deposit amount is valid, increase balance of current account
function handleDeposit() {
    console.log("in handleDeposit()")
    let depositAmount = parseFloat(prompt("Enter deposit amount:"))
    if (depositAmount && depositAmount>0) {
        currentAccount.deposit(depositAmount)
    }
    else {
        alert("Invalid deposit")
    }
    showAccountInfo(currentAccount)
}
// Prompt for withdrawal amount.
// if withdrawal amount is valid, decrease balance of current account
function handleWithdrawal() {
    console.log("in handleWithdrawal()")
    let withdrawalAmount = parseFloat(prompt("Enter withdrawal amount:"))
    if (withdrawalAmount && withdrawalAmount>0 
            && withdrawalAmount<=currentAccount.getBalance()) {
        currentAccount.withdraw(withdrawalAmount)
    }
    else {
        alert("Invalid withdrawal")
    }
    showAccountInfo(currentAccount)
}
// Display account owner name and balance
function showAccountInfo(account) {
    console.log("in showAccountInfo()")
    divShowAccountInfo.innerHTML =
            "<p>Name: " + account.getOwnerName() + "<p>" +
            "Balance: " + account.getBalance() + "</p>"
}
// Based on owner name, find existing account.
// If none, create new account for this owner name with zero balance
function findAccount(ownerName) {
    for (account of arrAccounts) {
        if (account.getOwnerName() == ownerName) {
            return account
        }
    }
    currentAccount = new bankAccount(ownerName)
    arrAccounts.push(currentAccount)
    return currentAccount
}

// EVENT LISTENERS //

btnName.addEventListener("click", function(event) {
    handleAccountName(event);});
btnDeposit.addEventListener("click", function(event) {
    handleDeposit(event);});
btnWithdrawal.addEventListener("click", function(event) {
    handleWithdrawal(event);});
        

init()


