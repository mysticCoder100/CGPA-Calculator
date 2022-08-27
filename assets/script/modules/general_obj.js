class GeneralTemplate {
    constructor() {
    }
    errorPage () {
        return $(`
            <h4>Error</h4>
        `)
    }
    emptyThePage () {
        $('body').children().not('script').remove();
    }
    ajax (data) {
        return ($.ajax({
            method: "POST",
            url: "../src/request.php",
            data: data,
            dataType: "JSON"
        }))
    }
    formAjax (data) {
        return ($.ajax({
            method: "POST",
            url: "../src/request.php",
            data: data,
            dataType: "JSON",
            cache: false,
            contentType: false,
            processData: false,
        }))
    }
    about () {
        return $(`
            <span id="about"> <i class="fas fa-question "></i> </span>
            <div class="about-content">
                <div class="main">
                    <h3>About</h3>
                    <p>This is a GPA Calculator which will help to calcuate our users GPA. <br/> <b>Note:</b> Presently This calculator is based on <a href="#">FUTA Grading System</a> </p>

                    <h4>Future Features</h4>
                    <ol>
                        <li>Student's GPA Management (CGPA)</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                    </ol>

                </div>
            </div>
        `)
    }


    response (message, myClass) {
        return $(`
            <div class="response ${myClass}">
                <span id="closeResponse" data-target=".response"><i class="fa fa-times"></i></span>
                <p>${message}</p>
            </div>
        `)
    }

    closeResponse () {
        $('#closeResponse').on('click', function () {
            let target = $(this).data('target');
            $(target).remove();
        });
    }


    setAbout (parent) {
        $(`#${parent}`).append(this.about());
        $('#about').on('click', () => {
            $(`.about-content`).toggleClass('open')
        });
    }
}



export default GeneralTemplate