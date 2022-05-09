

function pagination(data = {}, pageSize = 10, tableHeight = 500){

    const NUMBUTTONS = 10; // sets the maximum number of numerical buttons in pagination

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

        var maxPageNumber = Math.ceil(data.length / pageSize);
        var multipleIndex = Math.floor(activePageNumber / NUMBUTTONS);
        var iActivePage = activePageNumber % NUMBUTTONS;
       
        console.log("Active Page button: " + iActivePage);
        console.log("Multiple Index: " + multipleIndex);
        console.log("Max Page Number: " + maxPageNumber);

        // this automatically sets the paging buttons
        if (multipleIndex * pageSize == data.length /pageSize || iActivePage == 0) {
            multipleIndex--;
        }

        for (let i = multipleIndex*NUMBUTTONS; i < maxPageNumber; i++){
            if (i == multipleIndex*NUMBUTTONS) {
                var beginning = document.createElement("li");
                beginning.classList.add("page-item");
                var aBeggining = document.createElement("a");
                aBeggining.classList.add("page-link");
                aBeggining.innerHTML = '<<';
                aBeggining.onclick = function () { loadPaginatedTable(pageSize, 1); }
                ul.appendChild(beginning);
                beginning.appendChild(aBeggining);

                var oneLess = document.createElement("li");
                oneLess.classList.add("page-item");
                var aOneLess = document.createElement("a");
                aOneLess.classList.add("page-link");
                aOneLess.innerHTML = '<';
                aOneLess.onclick = function () { loadPaginatedTable(pageSize, (activePageNumber == 1 ? 1 : activePageNumber - 1)); }
                ul.appendChild(oneLess);
                oneLess.appendChild(aOneLess);
            }

            var li = document.createElement("li");
            li.classList.add("page-item");
            var a = document.createElement("a");
            a.classList.add("page-link");
            a.innerHTML = i + 1;

            if (i+1 == activePageNumber){
                li.classList.add("active");
            }
            else{
                a.onclick = function(){loadPaginatedTable(pageSize, i+1);}
            }
        
            ul.appendChild(li);
            li.appendChild(a);

            if (i == multipleIndex*NUMBUTTONS + (NUMBUTTONS-1)) {
                var next = document.createElement("li");
                next.classList.add("page-item");
                var nextA = document.createElement("a");
                nextA.classList.add("page-link");
                nextA.innerHTML = '>';
                nextA.onclick = function () { loadPaginatedTable(pageSize, (activePageNumber + 1 > maxPageNumber ? maxPageNumber : activePageNumber + 1)); }
                ul.appendChild(next);
                next.appendChild(nextA);

                var ending = document.createElement("li");
                ending.classList.add("page-item");
                var aEnding = document.createElement("a");
                aEnding.classList.add("page-link");
                aEnding.innerHTML = '>>';
                aEnding.onclick = function () { loadPaginatedTable(pageSize, (maxPageNumber)); }
                ul.appendChild(ending);
                ending.appendChild(aEnding);
                break;
            }
        }
    }

}







