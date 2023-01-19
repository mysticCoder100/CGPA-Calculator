import { Info } from "./Info.js";
import { response } from "./Response.js";
export function ApplicationSetup(prop) {
	let user = {};
	let handleUpdate = async function (e) {
		e.preventDefault();
		let data = new FormData(this);
		data.append("addDetails", true);
		let submitButton = $(this).find("button[type='submit'");
		let text = submitButton.text();
		submitButton.prop({ disabled: true })
			.html(`<div class="spinner-border spinner-border-sm text-white" role="status">
    </div>`);

		try {
			let res = await $.ajax({
				method: "POST",
				url: "../../../src/request.php",
				data: data,
				processData: false,
				contentType: false,
				cache: false,
				dataType: "json",
			});
			container.find(".cusError").remove();
			container.find(".alert").remove();

			if (res.status == "error") {
				if (typeof res.msg == "object") {
					let msg = res.msg;
					$.each(msg, (key, msg) => {
						let error = errorResponse({ msg });
						let input = container.find(`#${key}`);
						$(input).parent().after(error);
					});
				} else {
					container.prepend(
						response({ ...res, className: "danger" })
					);
				}
				submitButton.prop({ disabled: false }).text(text);
				return;
			}
			for (let key in user) {
				prop[key] = user[key];
			}
			submitButton.prop({ disabled: false }).text(text);
			container.prepend(response({ ...res, className: "success" }));
			container.find("input").prop({ readonly: true });
		} catch (error) {
			console.error(error);
		}
	};

	let errorResponse = ({ msg }) => {
		let element = $(`
      <p class="text-danger cusError">${msg}</p>
    `);
		return element;
	};

	let handleInput = function () {
		let value = $(this).val();
		let name = $(this).prop("name");
		user[name] = value;
	};

	let container = $(`
        <form class="application-setup">
            <div class="my-input" title="Current Level">
                <input type="text" name="level" class="form-control" id="level" placeholder="Current Level" value="${
					prop.level ?? ""
				}" ${prop.level && "readonly"}/>
            </div>
            <div class="my-input" title="Semester">
                <input type="text" name="semester" class="form-control" id="semester" placeholder="Semester" value="${
					prop.semester ?? ""
				}"  ${prop.semester && "readonly"}/>
            </div>
            <div class="my-input"  title="Course Duration">
                <input type="text" name="course_duration" class="form-control" id="course_duration" placeholder="Course of Study Duration" value="${
					prop.course_duration ?? ""
				}"  ${prop.course_duration && "readonly"}/>
            </div>
            <div class="my-button">
                <button type="submit" class="btn btn-primary "> Update</button>
            </div>
        </form>
    `);

	container.on("submit", handleUpdate);
	container.append(Info());
	container.find("input").each((i, el) => {
		$(el).on("input", handleInput);
	});
	return container;
}
