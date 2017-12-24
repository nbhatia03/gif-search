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
        .attr('data-name', term)
        $('#buttons').append(newBtn);
    }

}

function buttonClick(){

    var searchTerm = $(this).attr('data-name');
    var limit = 5;
    var url = "http://api.giphy.com/v1/gifs/search?q="+ searchTerm + "&api_key=SUKDMODfO0RfDFQmemfkqV6EeKBCtnjK&rating+R&limit=" + limit
    $.get(url).done(function(response){
        console.log(response);
        updateDom(response);
    })
}

function updateDom(response){
    $('#gifs').empty();
    var objArray = response.data
    objArray.forEach(function(gif){
        var imgSrc = gif.images.fixed_height_still.url;
        var newDiv = $('<div>')
        newDiv.addClass('gif')
        .attr('data-playing', '')
        .attr('data-still', imgSrc)
        .attr('data-play', gif.images.fixed_height.url)
        .append('<img src="' + imgSrc + '"/>'); //change to fixed_height onClick
        $('#gifs').append(newDiv)
    }
        
    );
}

function gifClick(){
    var gif = $(this).children('img');
    var isPlaying = $(this).attr('data-playing');
    var play = $(this).attr('data-play');
    var stop = $(this).attr('data-still')
    if(isPlaying){
        //stop gif
        $(this).attr('data-playing', '');
        gif.attr('src', stop)
    }else{
        //play gif
        $(this).attr('data-playing', 'playing');
        gif.attr('src', play);
    }
    
}

$('#buttons').on('click', '.btn', buttonClick);
$('#gifs').on('click', '.gif', gifClick);