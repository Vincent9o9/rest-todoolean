$(document).ready(function() {

    getData();

    $(document).on('click','span.delete',function(){
        var elemento = $(this);
        var idToDo = elemento.parent().attr('data-id');
        deleteElement(idToDo);
    });

    $('.inserisci').click(function(){
        var newElement = $('#nuova-voce').val();
        createElement(newElement);
    });

});

function getData(){
    $.ajax(
        {
            url: 'http://157.230.17.132:3028/todos',
            method: 'GET',
            success: function(risposta){
                getElement(risposta);
            },
            error: function(){
                alert('Errore')
            }
        }
    )
};

function getElement(data) {
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < data.length; i++){
        var context = {
            text: data[i].text,
            id: data[i].id
        }
        var html =  template(context);
        $('.todos').append(html);
    }
};

function createElement(elemento){
    $.ajax(
        {
            url: 'http://157.230.17.132:3028/todos',
            method: 'POST',
            data: {
                text: elemento
            },
            success: function(risposta){
                $('.todos').html('');
                getData();
            },
            error: function(){
                alert('Errore');
            }
        }
    );
};

function deleteElement(id){
    $.ajax(
        {
            url: 'http://157.230.17.132:3028/todos/' + id,
            method: 'DELETE',
            success:  function(risposta){
                console.log(risposta);
                $('.todos').html('');
                getData();
            },
            error: function(){
                alert('Errore');
            },
        }
    )

};
