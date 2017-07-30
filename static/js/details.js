$(function () {

    $('.people-details, .species-details, .locations-details, .vehicles-details, .films-details, .pilot-details').on('click', function (event) {
        event.preventDefault();
        var apiUrl = $(this).data('url');
        var imgUrl = $(this).data('img');
        var title = $(this).data('title');
        fetchDetails(apiUrl, imgUrl, title);
    });

    function fetchDetails(url, imgUrl, title) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function (response) {
                var trHTML = '';
                console.log(response);
                if (Array.isArray(response)) {
                    for (var i = 0; i < response.length; i++) {
                        trHTML += '<tr><td>' +
                            (response[i]['name'] ? response[i]['name'] : response[i]['title']) +
                            '</td></tr>';
                    }
                } else {
                    trHTML += '<tr><td>' +
                        (response['name'] ? response['name'] : response['title']) +
                        '</td></tr>';
                }

                $('.details-body').html(trHTML);
                $('.details-image').attr('src', imgUrl);
                $('.modal-title strong').html(title);
                $('#myModal').modal('show');
            }
        });
    }
});