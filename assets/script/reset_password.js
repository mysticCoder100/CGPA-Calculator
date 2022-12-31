import General from './modules/general_obj.js';
const general = new General();
$('#resetForm').on('submit', function (e) {
    e.preventDefault();
    let data = new FormData(this);
    data.append('resetPassword', true);
    let entries = data.entries();
    $.ajaxSetup({
        cache: false,
        processData: false,
        contentType: false
    })
    $.post('src/request.php', data, null, 'json')
        .done(function (res) {
            $(e.target).find('.response').remove();
            if (res.status == 'success') {
                let response = general.response(res.message, 'success');
                response.insertAfter($(e.target).find('h4'));
                window.location = '/'
            } else {
                console.log(res);
                let response = general.response(res.message, 'error');
                response.insertAfter($(e.target).find('h4'));
            }
            general.closeResponse();
        })
        .fail(function (res) {
            console.log(res.responseText);
        })
});

$('.see').each(function (i, el) {
    $(el).on('click', function () {
        let passwordField = $(this).prev();
        if ($(passwordField).attr('type') == 'password') {
            $(passwordField).attr('type', 'text')
            $(this).html(`<i class="fa fa-eye-slash" aria-hidden="true"></i>`)
        } else {
            $(passwordField).attr('type', 'password')
            $(this).html(`<i class="fa fa-eye" aria-hidden="true"></i>`)
        }
    });
});
