$(document).ready(function(){
    const main = $('main');
    var lastFile = null;

    setListeners = (elements) => {
        $.each(elements, (event) => {
            const element = elements[event];
            const elementEvents = $._data(element, 'events');

            if(!elementEvents)
                $(element).on('click', (event) => {
                    let link = $(event.target);
                    load(link.attr('link'));
                });
        });
    };

    clearLiseners = (elements) => {
        elements.off();
    };

    load = (link) => {
        const path = "html/pages/" +link +'.html';

        if(path == lastFile) // do not send request again if link alread loaded
            return;
        lastFile = path;

        clearLiseners($('main a'));
        return $.ajax({
            url: path, 
            success: (res) =>  {
                main.html($(res));
                setListeners($('a'));
            },
            statusCode: {
                404: () => load('404') // load 404.html page
            }
        });
    };

    setListeners($('a'));
    load('home'); // load home on init
});



