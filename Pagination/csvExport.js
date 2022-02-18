function csvExport(data){
    var fields = Object.keys(data[0])
    var replacer = function(key, value) { return value === null ? '' : value } 
    var csv = data.map(function(row){
      return fields.map(function(fieldName){
        return JSON.stringify(row[fieldName], replacer)
      }).join(',')
    })
    csv.unshift(fields.join(',')) // add header column
    csv = csv.join('\r\n');

    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", csv]);
    //var blob = new Blob([new Uint8Array([0xEF,0xBB,0xBF]),csv],{type:'application/csv;charset=UTF-8'});
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "data.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    return (console.log(csv));
}