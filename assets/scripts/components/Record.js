import { ResultAccordion } from "../components/ResultsAccordion.js";
export function Record({ level, levelRecords }) {
	let record = $(`
    <div class="record">
        <h4>${level} Level</h4>
        <div class="score">
        
        </div>
    </div>
    `);

	levelRecords.forEach((el) => {
		let title = el.semester == 1 ? "1st Semester" : "2nd Semester";
		record.find(".score").append(ResultAccordion({ ...el, title }));
	});
	return record;
}
