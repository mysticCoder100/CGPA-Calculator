import Index from './modules/index.obj.js';
import GeneralTemplate from './modules/general_obj.js';
import Home from './modules/home.obj.js';

const generalTemplate = new GeneralTemplate();
const index = new Index();

let link = window.location.href.split('?');
let url = link[0];
let path = url.split('/');
let route = path[path.length - 1]


$(window).on('load', function () {
    let xml = generalTemplate.ajax({ inSession: true });
    xml.done((response, status, jqxhr) => {
        if (response.session == false &&
            route != 'forget-password' &&
            route != '' &&
            route != 'register') {
            window.location = '/';
            return;
        } else if (
            response.session == true &&
            (route == 'forget-password' ||
                route == '' ||
                route == 'register')
        ) {
            window.location = 'home';
            return;
        } else if (route == 'logout') {
            let xml = generalTemplate.ajax({ inSession: true, logout: true })
            xml.done((response, status, jqxhr) => {
                if (response.session == true) {
                    window.location = '/'
                    return;
                }
            });
            return;
        }
        startRoute()
    })
})

function startRoute () {
    if (path.length > 4) {
        generalTemplate.emptyThePage();
        $('body').prepend(generalTemplate.errorPage())
        return
    }

    switch (route) {
        case '':
            index.setLoginForm();
            break;
        case 'register':
            index.setRegisterForm();
            break;
        case 'home':
            if (!link[1]) {
                new Home();
            } else {
                let params = new URLSearchParams(link[1])
                let paramsObject = []
                for (let paired of params.entries()) {
                    paramsObject.push([paired[0], paired[1]])
                }
                if (paramsObject.length > 1 ||
                    paramsObject[0][0] != 'number'
                ) {
                    window.location.href = '/home'
                } else {
                    let data = paramsObject[0][1];
                    let unit = data.split('$')
                    let number = unit[1];
                    let home = new Home()
                    $('#getCourseNumberForm').remove();
                    home.setCourseDataForm(number);
                }
            }

            break;
        case 'forget-password':
            index.setForgetPasswordForm();
            break;
        default:
            generalTemplate.emptyThePage();
            $('body').prepend(generalTemplate.errorPage());
            break;
    }
}


