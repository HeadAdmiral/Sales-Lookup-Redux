function getUnique(iterable) {
    // Counts the number of unique items in the collection provided.
    // Sets only allow 1 copy of each element in the Set.
    return new Set(iterable).size;
}

function getTransactions(tableData, transactionType){
    let transactions = [];
    
    // Adds the Transaction ID from each row in the table to an array
    for (let i = 0; i < tableData.rows.length; i++){
        if (tableData.rows[i].cells[1].innerText === transactionType){
            transactions.push(tableData.rows[i].cells[0].innerText);
        }
    }
   
    return transactions;
}

function createRow(table, rowHeading, quantity){
    let row = table.insertRow(table.rows.length);
    row.className = "k-footer-template";
    
    for (let i = 0; i < 6; i++){
        let cell = row.insertCell(i);
        
        if (i == 0){
            cell.innerHTML = (rowHeading + " " + quantity).bold();
        }
    }
}

window.onload = function(){

    // If the current page is Sales Lookup...
    if (window.location.href.indexOf("Sales") > -1){
        console.log("===== Sales Lookup Redux =====");
        console.log("Extension Loaded.");
        
        let statsTable = document.getElementsByTagName("tbody")[0];
        let salesTable = document.getElementsByTagName("tbody")[1];
        let customersServed = document.getElementsByTagName("td")[0];
        
                
        let transactions = getTransactions(salesTable, "Sale");
        let returns = getTransactions(salesTable, "Return");
        let exchanges = getTransactions(salesTable, "Exchange");
        let uniqueTransactions = getUnique(transactions);
        let uniqueReturns = getUnique(returns);
        let uniqueExchanges = getUnique(exchanges);
        
        customersServed.innerText = "Customers Served: " + uniqueTransactions;	
       
        createRow(statsTable, "Returns:", uniqueReturns);
        createRow(statsTable, "Exchanges:", uniqueExchanges);
        createRow(statsTable, "", "");
        
        console.log(uniqueTransactions);
        console.log(document.getElementsByTagName("td")[0]);


        /* This works correctly, but it counts returns/exchanges as sales. You should count sales only by checking the column
         * with sales in it and having those separate from returns and exchanges.
         */
        
        
        // tableRow[1] should yield tr.k-footer-template which is the row that contains the Customers Served count
        // The value can be changed under innerHTML
        
        // tableData[0] should yield Customers Served: #
        // The first cell of transactions seems to appear on tableData[20] but further testing is necessary.
        // Every 8th td is a new line
        
        // Just make a function that counts duplicates and you're golden bro

    }
}
