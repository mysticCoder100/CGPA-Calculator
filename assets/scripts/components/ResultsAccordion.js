export function ResultAccordion({ title, tcp, tlu, gpa, courses }) {
	let accordion = $(`
        <div class="score-list">
            <h4 class="score-list-header">
                <span class="score-title">${title}</span>
                <span class=""> <i class="fas fa-angle-down"></i> </span>
            </h4>
            <div class="score-body ">
                <div class="score-tab">
                    <h4>TCP: ${tcp}</h4>
                    <h4>TLU: ${tlu}</h4>
                    <h4>GPA: ${gpa}</h4>
                </div>
               <div class="table-responsive">
                <table class="table table-striped
                table-hover	
                table-borderless
                table-primary
                align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>S/N</th>
                            <th>Course Code</th>
                            <th>Course Unit</th>
                            <th>Score</th>
                            <th>Grade</th>
                        </tr>
                        </thead>
                        <tbody class="table-group-divider">
                           ${courses
								.map((course, i) => {
									return `<tr class="table-primary" >
                                    <td scope="row">${++i}</td>
                                    <td>${course.code}</td>
                                    <td>${course.unit}</td>
                                    <td>${course.score}</td>
                                    <td>${course.grade}</td>
                                </tr>`;
								})
								.join("")}
                        </tbody>
                </table>
               </div>
               
            </div>
        </div>
    `);
	accordion.find(".score-list-header").on("click", function () {
		let siblings = $(".score-list");
		let me = this;
		$(siblings).each(function (i, el) {
			if ($(el)[0] == $(me).parents(".score-list")[0]) return;
			if ($(el) == $(me).parents(".score-list")) return;
			let body = $(el).find(".score-body");
			body.removeClass("open");
			$(el).find(".score-list-header").removeClass("open");
		});
		accordion.find(".score-body").toggleClass(`open`);
		$(me).toggleClass("open");
	});
	return accordion;
}
