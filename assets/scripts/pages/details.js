import { Preloading } from "../actions/Preloading.js";
import { CompleteProfile } from "../components/CompleteProfile.js";
import { Record } from "../components/Record.js";
import { NotFound } from "../components/NotFound.js";

export async function Details({ page, user }) {
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

	let data = { id: user.id, fetchScores: true };
	try {
		let details = await $.post(
			"../../../src/request.php",
			data,
			null,
			"json"
		);

		if (details.details == 0) {
			Preloading(page);
			$("#main").append(NotFound());
			return;
		}

		let gottenLevel = details.levels;
		let gottenRecords = details.details;

		let section = $(`
    	<section id="details">
            <h3>My Records</h3>
            <div class="records">
			
            </div>
        </section>
    `);
		Preloading(page);
		gottenLevel.forEach((level) => {
			let levelRecords = gottenRecords.filter((el) => el.level == level);
			section.find(".records").append(Record({ level, levelRecords }));
		});
		$("#main").append(section);
	} catch (error) {
		console.error(error.responseText);
	}
}
