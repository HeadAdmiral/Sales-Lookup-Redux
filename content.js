/*45-RE-6934360
45-PO-6934344
45-PO-6934344
45-PO-6934344
45-PO-6934344
45-PO-6934344
45-PO-6934344
45-PO-6934327
45-PO-6934319
45-PO-6934269
45-PO-6934269
45-PO-6934269
45-PO-6934269
45-PO-6934269
45-PO-6934269
45-PO-6934217*/

function getUnique(iterable) {
    // Counts the number of unique items in the collection provided.
    // Sets only allow 1 copy of each element in the Set.
    return new Set(iterable).size;
}

function getTransactions(tableData){
    // This function iterates through each row in the Sales Lookup table and adds the transaction ID to an array.
    let transactions = [];
    for (let i = 20; i < tableData.length; i+=8){
        transactions.push(tableData[i]);
        console.log("Adding transaction " + tableData[i] + " to transactions list.");
    }
    return transactions;
}

window.onload = function(){

    console.log("===== Sales Lookup Redux =====");
    console.log("Extension Loaded.");

    if (window.location.href.indexOf("Sales") > -1){
        let tableRow = document.getElementsByTagName("tr");
        let tableData = document.getElementsByTagName("td");
        let transactions = getTransactions(tableData);
        let uniqueTransactions = getUnique(transactions);

        console.log(tableRow);
        console.log(tableData);
        console.log(transactions);
        console.log(uniqueTransactions);

        
        // tableRow[1] should yield tr.k-footer-template which is the row that contains the Customers Served count
        // The value can be changed under innerHTML
        
        // tableData[0] should yield Customers Served: #
        // The first cell of transactions seems to appear on tableData[20] but further testing is necessary.
        // Every 8th td is a new line
        
        // Just make a function that counts duplicates and you're golden bro

    }
}
