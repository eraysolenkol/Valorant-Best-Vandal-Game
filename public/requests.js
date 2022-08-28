const get = async (url) => {
    let data;    
    await $.ajax({
        type: "GET",
        url: url,
        async: true,
    }).done(result => { 
        data = result;
    });
    return data;
}


const post = (url, body) => {   
    $.ajax({
        type: "POST",
        url: url,
        async: true,
        data: body,
    });
}
