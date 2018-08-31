function getUnique(iterable) {
    // Counts the number of unique items in the collection provided.
    // Sets only allow 1 copy of each element in the Set.
    return new Set(iterable).size;
}

function formatPrice(price) {
    
    if (price.indexOf("(") != -1){
        price = price.replace("(", "");
        price = price.replace(")", "");
        price = price.replace("$", "");
        price = price * -1;
    }
    
    else{
        price = price.replace("$", "");
    }
    
    return price
}

function getSum(total, value) {
    total = Number(total);
    value = Number(value);
    return total + value;
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

function getRevenue(tableData, transactionType){
    let revenue = [];
    
    // Adds the Transaction ID from each row in the table to an array
    for (let i = 0; i < tableData.rows.length; i++){
        if (tableData.rows[i].cells[1].innerText === transactionType){
            revenue.push(tableData.rows[i].cells[7].innerText);
        }
    }
    
    for (let j = 0; j < revenue.length; j++){
        revenue[j] = formatPrice(revenue[j]);
    }
    
    if (revenue.length > 0){
        revenue = revenue.reduce(getSum).toLocaleString();

        
        if (revenue < 0){
            if (revenue.toString().indexOf(".") == -1){
                return ("($" + revenue * -1 + ".00)").bold();
            }

            return ("($" + revenue * -1 + ")").bold(); 
        }
        else if (revenue == 0){
            return ("$" + revenue + ".00").bold();
        }
        else{
            if (revenue.toString().indexOf(".") == -1){
                return ("$" + revenue + ".00").bold();
            }
            
            return ("$" + revenue).bold();
        }
    }
    
    else{
        return ("$0.00").bold();
    }

   
}
   

function createRow(table, rowHeading, quantity){
    let row = table.insertRow(table.rows.length);
    row.className = "k-footer-template";
    
    for (let i = 0; i < 6; i++){
        let cell = row.insertCell(i);
        
        if (i == 0){
            cell.innerHTML = (rowHeading + " " + quantity).bold();
        }
        
        if (i == 2){
            if (rowHeading === "Returns:"){
                cell.innerHTML = getRevenue(document.getElementsByTagName("tbody")[1], "Return");
            }
            else if (rowHeading === "Exchanges:"){
                cell.innerHTML = getRevenue(document.getElementsByTagName("tbody")[1], "Exchange");
            }
        }
    }
}

function selectElement(id, valueToSelect)
{    
    var element = document.getElementsByTagName(id)[0];
    element.value = valueToSelect;
}


window.onload = function(){

    // If the current page is Sales Lookup...
    if (window.location.href.indexOf("Sales") > -1){
        console.log("===== Sales Lookup Redux =====");
        console.log("Extension Loaded.");
	    
	let dropdown = document.getElementsByTagName("select")[0];
	console.log(dropdown);
	dropdown.value = 100;
        
        let statsTable = document.getElementsByTagName("tbody")[0];
        let salesTable = document.getElementsByTagName("tbody")[1];
        let customersServed = document.getElementsByTagName("td")[0];
        
                
        let transactions = getTransactions(salesTable, "Sale");
        let returns = getTransactions(salesTable, "Return");
        let exchanges = getTransactions(salesTable, "Exchange");
        let uniqueTransactions = getUnique(transactions);
        let uniqueReturns = getUnique(returns);
        let uniqueExchanges = getUnique(exchanges);
//         let returnsRevenue = getRevenue(salesTable, "Return");
//         let exchangesRevenue = getRevenue(salesTable, "Exchange");
        
        customersServed.innerText = "Customers Served: " + uniqueTransactions;	
       
        createRow(statsTable, "Returns:", uniqueReturns);
        createRow(statsTable, "Exchanges:", uniqueExchanges);
        createRow(statsTable, "", "");
        
        
        
        


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
