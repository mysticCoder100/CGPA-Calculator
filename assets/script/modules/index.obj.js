import GeneralTemplate from './general_obj.js';

class Index extends GeneralTemplate {
    constructor() {
        super();
        this.setIndexWrapper();
    }

    loginForm () {
        return $(`
            <form id="loginForm">
                
                    <h4>Login</h4>

                    <div class="form-group">
                        <span><i class="fas fa-user"></i></span>
                        <input class="form-control" type="text" placeholder="Username" name="username" value="" >
                    </div>

                    <div class="form-group">
                        <span><i class="fas fa-lock"></i></span>
                        <input class="form-control"type="password" placeholder="Password" name="password" value="">
                        <span class="open-password"><i class="fa fa-eye"></i></span>
                    </div>

                    <div class="formButton">
                        <button class="btn" type="submit">Login <i class="fas fa-sign-in-alt"></i> </button>
                        <a href="/#forget-password"  id="forgetPassword">Forget Password?</a>
                        <a href="/#register" id="indexRegisterLink">Register?</a>
                    </div> 

            </form>
        `)
    }

    indexWrapper () {
        return $('<main></main>').prop({
            id: 'index'
        })
    }

    forgetPasswordForm () {
        return $(`
            <form id="forgetPasswordForm">

                <h4>Forget Password</h4>

                <div class="form-group">
                    <span><i class="fas fa-envelope"></i></span>
                    <input class="form-control"type="email" placeholder="Email" name="email" value="">
                </div>

                <div class="formButton">
                    <button class="btn" type="submit">Send <i class="fas fa-paper-plane"></i> </button>    
                </div>
                
            </form>
        `)
    }

    registerForm () {
        return $(`
            
        <form id="registerForm">

            <h4>Register</h4>

            <div class="form-group">
                <span><i class="far fa-user"></i></span>
                <input class="form-control" type="text" placeholder="First Name" name="fname" value="" />
            </div>
            <div class="form-group">
                <span><i class="far fa-user"></i></span>
                <input class="form-control" type="text" placeholder="Last Name" name="lname" value="" />
            </div>
            <div class="form-group">
                <span><i class="fas fa-envelope"></i></span>
                <input class="form-control" type="email" placeholder="Email" name="email" value="" />
            </div>
            <div class="form-group">
                <span><i class="fas fa-user"></i></span>
                <input class="form-control" type="text" placeholder="Username" name="uname" value="" />
            </div>

            <div class="form-group">
                <span><i class="fas fa-lock"></i></span>
                <input class="form-control" type="password" placeholder="Password" name="pword" value="" />
                <span class="open-password"><i class="fa fa-eye"></i></span>
            </div>
            <div class="form-group">
                <span><i class="fas fa-lock"></i></span>
                <input class="form-control" type="password" placeholder="Comfirm Password" name="cpword" value="" />
                <span class="open-password"><i class="fa fa-eye"></i></span>
            </div>
            <div class="formButton">
                <button class="btn" type="submit">Register <i class="fas fa-user-plus"></i> </button>
                <a href="/" id="indexLoginLink">Login?</a>
            </div>


        </form>
        `)

    }

    setForgetPasswordForm () {
        $('#index').append(this.forgetPasswordForm());
        $('#forgetPasswordForm').on('submit', (e) => {
            e.preventDefault();
            let myText = $(e.target).find('button[type="submit"]').html()
            $(e.target).find('button[type="submit"]')
                .attr('disabled', true)
                .text(`Loading ... `)
            let data = new FormData(e.target);
            data.append('forgetPassword', true);
            $.ajaxSetup({
                cache: false,
                contentType: false,
                processData: false,
            });
            $(e.target).find('.response').remove();
            $.post('src/request.php', data, null, "json")
                .done((res) => {
                    $(e.target).find('button[type="submit"]')
                        .attr('disabled', false)
                        .html(myText)
                    if (res.status == 'error') {
                        let response = super.response(res.message, 'error')
                        response.insertAfter($(e.target).find('h4'))
                    } else {
                        let response = super.response(res.message, 'success')
                        response.insertAfter($(e.target).find('h4'))
                    }
                    super.closeResponse();
                })
        })
    }

    setRegisterForm () {
        $('#index').append(this.registerForm());
        super.setAbout('index')
        this.openPassword();
        $('#registerForm').on('submit', (e) => {
            e.preventDefault();
            let me = $('#registerForm');
            let data = new FormData(me[0]);
            data.append('register', true)
            let xml = super.formAjax(data);
            me.children('.response').remove();
            xml.done((response, status, jqxhr) => {
                if (response.status == 'success') {
                    let output = super.response(response.message, 'success');
                    $(output).insertAfter(`#${me[0].id} h4`);
                    if (response.registered) {
                        me.remove();
                        window.history.replaceState(null, null, `/`)
                        this.setLoginForm();
                        let output = super.response('Thank You For Registering', 'success');
                        $(output).insertAfter(`#loginForm h4`);
                    }
                } else {
                    let output = super.response(response.message, 'error');
                    $(output).insertAfter(`#${me[0].id} h4`);
                }
                super.closeResponse();
            });
        })
    }

    setLoginForm () {
        $('#index').append(this.loginForm());
        super.setAbout('index')
        this.openPassword();
        $('#loginForm').on('submit', (e) => {
            e.preventDefault();
            let me = $('#loginForm')
            let data = new FormData(me[0]);
            data.append('login', true)
            let xml = super.formAjax(data);
            me.children('.response').remove();
            xml.done((response, status, jqxhr) => {
                if (response.status == 'success') {
                    let output = super.response(response.message, 'success');
                    $(output).insertAfter(`#${me[0].id} h4`);
                    window.location = '/#home';
                } else {
                    let output = super.response(response.message, 'error');
                    $(output).insertAfter(`#${me[0].id} h4`);
                }
                super.closeResponse();
            })
        })
    }

    openPassword () {
        $('.open-password').on('click', function () {
            if ($(this).children().hasClass('fa-eye')) {
                $(this).children().removeClass('fa-eye').addClass('fa-eye-slash')
                $(this).prev().prop({ type: 'text' })
            } else {
                $(this).children().removeClass('fa-eye-slash').addClass('fa-eye')
                $(this).prev().prop({ type: 'password' })
            }
        })
    }

    setIndexWrapper () {
        $('body').prepend(this.indexWrapper)
    }


}

export default Index;