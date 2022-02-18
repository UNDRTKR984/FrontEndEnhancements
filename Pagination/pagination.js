

function pagination(data = {}, pageSize = 10, tableHeight = 500){
    
    var tableSection = document.getElementById("tableSection");
    tableSection.style.height = tableHeight+"px";
    tableSection.style.overflowY = "auto";
    
    if (data.length > 0){
        // what appears below creates a table no matter what data you have in there
        var keys = Object.keys(data[0]);
        
        var table = document.getElementById("paginationTable");
        
        table.insertRow() // needed for some reasone to get table header to show properly
        
        // Create an empty <thead> element and add it to the table:
        var header = table.createTHead();
        // Create an empty <tr> element and add it to the first position of <thead>:
        var row = header.insertRow();
    
        for (let i=0; i < keys.length; i++){


            // Insert a new cell (<td>) at the first position of the "new" <tr> element:
            var cell = row.insertCell(i);
        
            // Add some bold text in the new cell:
            cell.innerHTML = keys[i];
        }
    }

    loadPaginatedTable(pageSize);

    function loadPaginatedTable(pageSize = 10, activePageNumber = 1){
        if (data.length == 0){
            return;
        }
        //remove everything in the body
        var tb = document.querySelector('tbody');
        // while tb has children, remove the first one
        while (tb.childNodes.length) {
            tb.removeChild(tb.childNodes[0]);
        }

        //remove and reload pagination section
        var paginationSection = document.querySelector('#pagination');
        while (paginationSection.childNodes.length){
            paginationSection.removeChild(paginationSection.childNodes[0]);
        }

        // fill the table body according to page number and page size
        for (let i = (activePageNumber*pageSize)-pageSize; (i < data.length && i < activePageNumber*pageSize); i++){
            var row = tb.insertRow();
            keys.forEach(key => {
                var cell = row.insertCell();
                cell.innerHTML = data[i][key];
            });
        }

        // impletment pagination buttons
        var ul = document.getElementById("pagination");

        // this automatically sets the paging buttons
        for (let i = 0; i<data.length/pageSize; i++){
            var li = document.createElement("li");
            li.classList.add("page-item");
            var a = document.createElement("a");
            a.classList.add("page-link");
            a.innerHTML = i+1;
            if (i+1 == activePageNumber){
                li.classList.add("active");
            }
            else{
                a.onclick = function(){loadPaginatedTable(pageSize, i+1);}
            }
        
            ul.appendChild(li);
            li.appendChild(a);
        }
    }

}







