import { Preloading } from "../actions/Preloading.js";
import { ResultAccordion } from "../components/ResultsAccordion.js";
import { CompleteProfile } from "../components/CompleteProfile.js";

export async function Dashboard({ page, user }) {
	page = page || "dashboard";
	let level = user.level;
	let semester = user.semester;
	let course_duration = user.course_duration;

	if (
		isNaN(level) ||
		level == 0 ||
		level == null ||
		isNaN(semester) ||
		semester == 0 ||
		semester == null ||
		isNaN(course_duration) ||
		course_duration == 0 ||
		course_duration == null
	) {
		Preloading(page);
		$("#main").append(CompleteProfile());
		return;
	}
	let data = { id: user.id, fetchLatest: true };
	try {
		let details = await $.post(
			"../../../src/request.php",
			data,
			null,
			"json"
		);

		let totalSemester = course_duration * 2;
		let spentSemesterF =
			level == 100
				? String(level).split("")[0] * semester
				: String(level).split("")[0] * semester +
				  Number([String(level).split("")[0] - 1]);
		let spentSemesterS = String(level).split("")[0] * semester;
		let remainingSemester =
			semester == 1
				? totalSemester - spentSemesterF
				: totalSemester - spentSemesterS;

		let section = $(`
        <section id="dashboard">
          <div class="summaries">
              <div class="summary">
                  <h4>Total Semester Left</h4>
                  <div class="body">
                    <span> <i class="fas fa-cubes" ></i> </span>
                    <h6>${
						(remainingSemester == 0 && "Graduated") ||
						remainingSemester
					}</h6>
                  </div>
              </div>
              <div class="summary">
                <h4>Current GPA</h4>
                <div class="body">
                  <span> <i class="fas fa-chart-simple" ></i> </span>
                  <h6>${user.gpa || 0}</h6>
              </div>
              </div>
              <div class="summary">
                <h4>CGPA</h4>
                <div class="body">
                  <span> <i class="fas fa-calculator" ></i> </span>
                  <h6>${user.cgpa || 0}</h6>
              </div>
              </div>
          </div>    
       </div>
          <div class="scores">
            <h2>Latest Results</h2>
            <div class="score" >
            

               
            </div>  
            </div>
          </div>
      
        </section>
    `);
		Preloading(page);

		details.details.forEach((el, i) => {
			let title =
				el.semester == 1
					? `${el.level} Level ${el.semester}st Semester `
					: `${el.level} Level ${el.semester}nd Semester`;
			section.find(".score").append(ResultAccordion({ ...el, title }));
		});
		$("#main").append(section);
	} catch (error) {
		console.error(error);
	}
}
