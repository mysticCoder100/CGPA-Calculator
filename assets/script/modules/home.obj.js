import GeneralTemplate from "./general_obj.js";

class Home extends GeneralTemplate {
    constructor() {
        super();
        this.setHome()
    }

    home () {
        return $('<main></main>').prop({
            id: 'home'
        })
    }

    homeAside () {
        return $(`<aside></aside>`).prop({
            id: 'sidebar'
        })
    }

    sideContent () {
        return $(`
            <div class="head">
                <div class="content">
                    <p>Username</p>
                    <img class="userImage" src="./assets/images/default.png" alt="progileimage">
                </div>
            </div>
            <div class="body">         
            </div>
        `)
    }

    profile () {
        return $(`
            <div class="profile">
                <span id="closeProfile"><i class="fas fa-arrow-left"></i> </span>
                <h3>My Profile</h3>
                <form id="updateProfile">
                    <label for="changeImage"><img class="profileImage" src="./assets/images/default.png" alt="progileimage"></label>
                    <input type="file" id="changeImage" name="image" hidden=hidden>
                    <div class="profile-area">
                        <h3>First Name</h3>
                        <h3>Last Name</h3>
                        <h3>Email</h3>

                    </div>
                    <a class="logout" href="/logout">Logout <i class="fas fa-sign-out-alt" ></i> </a>
                </form>

            </div>
        `)
    }
    setProfile () {
        $('#sidebar .body').append(this.profile());
        $('#closeProfile').on('click', () => {
            $('#sidebar .body').empty();
            $(this.setSideBody());
        })
        $('#changeImage').on('change', (e) => {
            let me = $('#changeImage')[0];
            console.log(me.files[0]);
        })
    }

    sideBody () {
        return $(`
            <div class="info-container">
                <div class="info">
                    <div>
                        <label>GPA/CGPA:</label>
                        <span>4.67</span>
                    </div>
                    <div>
                        <label>School:</label>
                        <span>FUTA</span>
                    </div>
                    <div>
                        <label>Department:</label>
                        <span>SEN</span>
                    </div>
                    <div>
                        <label>Level:</label>
                        <span>400</span>
                    </div>
                </div>
                <div class="records">
                   
                </div>
            </div>
        `)
    }


    defaultRecord () {
        return $(`
            <div class="default-record">
                
            </div>
        `)
    }

    setDefaultRecord () {
        $('#sidebar .body .records').append(this.defaultRecord())
        $('.default-record').append(
            $(`<h3>My Records</h3>`)
        )
        let setLevelRecord = (level, semester) => {
            return $(`<div class="record-level" data-level="${level}" data-semester="${semester}" >${level} Level ${semester} Semester</div>`)
        }

        $('.default-record').append($(`
            <div  class="record-not-found" >
            <h3> <span><i class="fas fa-exclamation-circle"></i></span>  Sorry No Record Found</h3>
            </div>    
        `)
        );
        // let data = { getLevels: true }

        // let xml = super.ajax(data);
        // xml.fail((jqxhr, status, response) => {
        //     console.log(response);
        // })
        // xml.done((response, status, jqxhr) => {
        //     response.forEach(el => {
        //         $('.default-record').append(setLevelRecord(el.level, el.semester))
        //     })

        //     $('.record-level').each((i, el) => {
        //         let me = el;
        //         $(me).on('click', () => {
        //             let level = $(me).data('level');
        //             let semester = $(me).data('semester');
        //             $('.records').append(this.levelDetail(level, semester))
        //             $('#closeLevelDetails').on('click', function () {
        //                 $('.level-detail').remove();
        //             })
        //         });


        //     })

        // })

    }


    levelDetail (level, semester) {
        return $(`
            <div class="level-detail">
                <span id="closeLevelDetails"><i class="fa fa-times"></i></span>
                <p>clicked on ${level} Level ${semester} Semester Button</p>
            </div>
        `)
    }

    sideToggler () {
        return $(`
            <div class="sideToggler ">
                <span><i class="fas fa-angle-left"></i></span>
            </div>
        `)
    }

    setSideBody () {
        $('#sidebar .body').append(this.sideBody())
        this.setDefaultRecord();
    }

    setHome () {
        $('#index').remove();
        $('body').addClass('homeBody')
        $('body').prepend(this.homeAside())
        $('body').prepend(this.home())
        $('#home').prepend(this.sideToggler())
        $('#sidebar').prepend(this.sideContent())
        this.setSideBody();
        this.setCourseNumber();

        // testing

        // $('#sidebar .body').empty();
        // this.setProfile();
        // this.sideToggling();

        $('.userImage').on('click', () => {
            if ($('#sidebar .body').children().hasClass('profile')) {
                $('#sidebar .body').empty();
                $(this.setSideBody());
                return;
            }

            $('#sidebar .body').empty();
            this.setProfile();
        })

        $('.sideToggler').on('click', () => {
            this.sideToggling();
        })
        super.setAbout('home');
    }

    sideToggling () {
        $('.sideToggler span').toggleClass('open')
        $('#home').toggleClass('open')
        $('#sidebar').toggleClass('open')
        $('#sidebar .info-container').toggleClass('open')
    }

    setCourseNumber () {
        $('#home').prepend(this.courseNumber());
        let courseNumberForm = $('#getCourseNumberForm')

        courseNumberForm.on('submit', (e) => {
            e.preventDefault();
            let me = courseNumberForm;
            let numberOfCourses = $('#courseNumberField').val()
            if (numberOfCourses == "") {
                $('.response').remove();
                super.response('Field Empty !!!', 'error').insertBefore($('#getCourseNumberForm .form-group'))
                super.closeResponse();
                setTimeout(() => {
                    $('#getCourseNumberForm .response').remove()
                }, 5000)
                return;
            }
            $('.response').remove();
            this.setUrl(numberOfCourses)
            me.remove()
            this.setCourseDataForm(numberOfCourses);
        })
    }

    courseNumber () {
        return $(`
           <form id="getCourseNumberForm" method="GET" >
                <div class="form-group">
                    <span><i class="fas fa-file-signature"></i></span>
                    <input type="number" id="courseNumberField" class="form-control" placeholder="Total Number of Courses " name="" value="">
                    <button type="submit" class="btn" id="getCourseNumberButton">Enter</button>
                </div>
            
           </form>
        `)
    }


    courseData (i) {
        return $(`
            <div class="form-group courseDataContainer">
                <input type="text" placeholder="Course Code" class="form-control" name="courses[${i}][code]" value="">

                <input type="number" placeholder="Course Unit" class="form-control" name="courses[${i}][unit]" value="">

                <input type="number" placeholder="Course Score" class="form-control" name="courses[${i}][score]" value="">
            </div>
        `)
    }

    courseDataForm () {
        return $(`
            <form id="courseDataForm" method="POST">
                <div class="head">
                    <h3> GPA Calculator </h3>
                    
                    <div class="icon">
                        <span id="addField" ><i class="fas fa-plus"></i>Add</span>
                        <span id="removeField"><i class="fas fa-minus"></i> Remove</span>
                        <span id="clearField" ><i class="fas fa-eraser"></i> Clear</span>
                        <button type="submit" id="saveRecord" class=""><i class="far fa-save"></i> Save</button>
                    </div>
                    
                </div>
                <div class="body">
                    
                </div>
            </form>
        `)
    }

    setUrl (number) {
        let hash = md5(number)
        window.history.replaceState(null, null, `home?number=${hash.length}$${number}$${hash}`)
    }

    setCourseDataForm (number) {
        $('#home').prepend(this.courseDataForm())
        for (let i = 0; i < number; i++) {
            $('#courseDataForm .body').append(this.courseData(i))
        }

        $('#courseDataForm').on('submit', (e) => {
            e.preventDefault();
            let me = $('#courseDataForm');
            let save = $('#saveRecord')
            let defaultHtml = save.html();
            save.html('loading...')
            save.prop('disabled', true)
            let data = new FormData(me[0]);

            data.append('saveRecord', true)
            me.children('.body').children('.response').remove();

            let setBack = () => {
                save.prop('disabled', false)
                save.html(defaultHtml)
            }

            let xml = super.formAjax(data);
            xml.done((response, status, jqxhr) => {

                if (response.status == 'error') {
                    let output = super.response(response.message, 'error')
                    me.children('.body').prepend(output);
                    super.closeResponse();
                    setBack();
                } else {
                    let output = super.response(response.message, 'success')
                    me.children('.body').prepend(output);
                    super.closeResponse();
                    setBack();
                }
            })
            xml.fail((jqxhr, status, response) => {
                let output = super.response('Sorry An Error Occured !!!!', 'error')
                me.children('.body').prepend(output);
                super.closeResponse();
                setBack();
            });

        });


        $('#addField').on('click', () => {
            $('#courseDataForm .body').append(this.courseData(
                $('.courseDataContainer').length
            ))
            this.setUrl($('.courseDataContainer').length)
        });
        $('#removeField').on('click', () => {
            $('.courseDataContainer').each(function (i, el) {
                if ($('.courseDataContainer').length == 1) return;
                if (i == $('.courseDataContainer').length - 1) {
                    el.remove();
                }
            })
            this.setUrl($('.courseDataContainer').length)
        });
        $('#clearField').on('click', () => {
            $('.courseDataContainer').each(function (i, el) {
                if (i == 0) return;
                el.remove();
            })
            this.setUrl($('.courseDataContainer').length)
        });
    }

}
export default Home