window.onload = function(){

    console.log("===== Sales Lookup Redux =====");
    console.log("Extension Loaded.");

    if (window.location.href.indexOf("Sales") > -1){
        let tableRow = document.getElementsByTagName("tr");
        let tableData = document.getElementsByTagName("td");
        console.log(tableRow);
        console.log(tableData);
        
        // tableRow[1] should yield tr.k-footer-template which is the row that contains the Customers Served count
        // The value can be changed under innerHTML
        
        // tableData[0] should yield Customers Served: #
        // The first cell of transactions seems to appear on tableData[20] but further testing is necessary.
        // Every 8th td is a new line
        
        // Just make a function that counts duplicates and you're golden bro
    }
}
