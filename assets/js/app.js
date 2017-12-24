function submitFunc(){
    event.preventDefault();
    var searchTerm = $('#searchBar').val().trim()
    
    addButton(searchTerm);
}

function addButton(term){
    if(term){
        var newBtn = $('<button>')
        .text(term)
        .addClass('btn')
        .attr('data-name', term);
        $('#buttons').append(newBtn);
    }

}

function buttonClick(){

    var searchTerm = $(this).attr('data-name');
    var limit = 5;
    var url = "http://api.giphy.com/v1/gifs/search?q="+ searchTerm + "&api_key=SUKDMODfO0RfDFQmemfkqV6EeKBCtnjK&limit=" + limit
    $.get(url).done(function(response){
        console.log(response);
    })
}

$('#buttons').on('click', '.btn', buttonClick);