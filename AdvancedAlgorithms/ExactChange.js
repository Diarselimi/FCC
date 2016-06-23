function checkCashRegister(price, cash, cid) {
    //check if the cash is less than a price
    if(cash < price) {
        //return a message
        return 'Not enough cash';
    }
    //the change
    //the changes will save here
    var change;
    //cashToReturn this will hold the cash that we still need to return and it will start from price - cash
    var cashToReturn = price - cash;
    //the loop unitl the cash to return is zero
    while(cashToReturn > 0) {
        //search for the greatest change you can return 
    }

    console.log(change);
    return change;
}

checkCashRegister(19.50, 20.00, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.10],
    ["QUARTER", 4.25],
    ["ONE", 90.00],
    ["FIVE", 55.00],
    ["TEN", 20.00],
    ["TWENTY", 60.00],
    ["ONE HUNDRED", 100.00]
]);

/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), 
payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
cid is a 2D array listing available currency.
Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. Return the string "Closed" 4
if cash-in-drawer is equal to the change due.
Otherwise, return change in coin and bills, sorted in highest to lowest order.
*/