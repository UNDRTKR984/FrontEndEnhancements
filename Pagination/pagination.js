// sample data (don't actually use this lol)
var data = [{"id":1,"employee_name":"Tiger Nixon","employee_salary":320800,"employee_age":61,"profile_image":""},{"id":2,"employee_name":"Garrett Winters","employee_salary":170750,"employee_age":63,"profile_image":""},{"id":3,"employee_name":"Ashton Cox","employee_salary":86000,"employee_age":66,"profile_image":""},{"id":4,"employee_name":"Cedric Kelly","employee_salary":433060,"employee_age":22,"profile_image":""},{"id":5,"employee_name":"Airi Satou","employee_salary":162700,"employee_age":33,"profile_image":""},{"id":6,"employee_name":"Brielle Williamson","employee_salary":372000,"employee_age":61,"profile_image":""},{"id":7,"employee_name":"Herrod Chandler","employee_salary":137500,"employee_age":59,"profile_image":""},{"id":8,"employee_name":"Rhona Davidson","employee_salary":327900,"employee_age":55,"profile_image":""},{"id":9,"employee_name":"Colleen Hurst","employee_salary":205500,"employee_age":39,"profile_image":""},{"id":10,"employee_name":"Sonya Frost","employee_salary":103600,"employee_age":23,"profile_image":""},{"id":11,"employee_name":"Jena Gaines","employee_salary":90560,"employee_age":30,"profile_image":""},{"id":12,"employee_name":"Quinn Flynn","employee_salary":342000,"employee_age":22,"profile_image":""},{"id":13,"employee_name":"Charde Marshall","employee_salary":470600,"employee_age":36,"profile_image":""},{"id":14,"employee_name":"Haley Kennedy","employee_salary":313500,"employee_age":43,"profile_image":""},{"id":15,"employee_name":"Tatyana Fitzpatrick","employee_salary":385750,"employee_age":19,"profile_image":""},{"id":16,"employee_name":"Michael Silva","employee_salary":198500,"employee_age":66,"profile_image":""},{"id":17,"employee_name":"Paul Byrd","employee_salary":725000,"employee_age":64,"profile_image":""},{"id":18,"employee_name":"Gloria Little","employee_salary":237500,"employee_age":59,"profile_image":""},{"id":19,"employee_name":"Bradley Greer","employee_salary":132000,"employee_age":41,"profile_image":""},{"id":20,"employee_name":"Dai Rios","employee_salary":217500,"employee_age":35,"profile_image":""},{"id":21,"employee_name":"Jenette Caldwell","employee_salary":345000,"employee_age":30,"profile_image":""},{"id":22,"employee_name":"Yuri Berry","employee_salary":675000,"employee_age":40,"profile_image":""},{"id":23,"employee_name":"Caesar Vance","employee_salary":106450,"employee_age":21,"profile_image":""},{"id":24,"employee_name":"Doris Wilder","employee_salary":85600,"employee_age":23,"profile_image":""}];

// set your page size here
var pageSize = 15;

// set your table height in pixels here
var tableHeight = 500;


var tableSection = document.getElementById("tableSection");
tableSection.style.height = tableHeight+"px";
tableSection.style.overflowY = "auto";

// what appears below creates a table no matter what data you have in there
if (data.length > 0){
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


