import { Preloading } from "../actions/Preloading.js";
import { CalculationInput } from "../components/CalculationInput.js";
import { CompleteProfile, Graduated } from "../components/CompleteProfile.js";
import { response } from "./../components/Response.js";

export async function Calculate({ page, user }) {
	let handleAdd = function () {
		$(this).prop({ disabled: true });
		let text = $(this).text();
		$(this)
			.html(`<div class="spinner-border spinner-border-sm text-white" role="status">
    	</div>`);
		let num = Number($(this).prev().val());
		$(this).prev().val("");
		let lastForm = $(".calculation-input:last-of-type").data("num");
		lastForm = typeof lastForm == "undefined" ? -1 : Number(lastForm);
		if (num == 0 || isNaN(num)) {
			$(this).prop({ disabled: false }).text(text);
			section.find(".myModal").removeClass("open");
			return;
		}
		for (let i = lastForm + 1; i <= lastForm + num; i++) {
			section.find(".main").append(CalculationInput({ num: i }));
		}
		section.find(".myModal").removeClass("open");
		$(this).prop({ disabled: false }).text(text);
	};

	let handleClear = function () {
		let element = section.find(".main").children().not(".myModal");
		element.addClass("remove");
		setTimeout(() => {
			element.remove();
		}, 500);
	};

	let handleCalculate = async function (e) {
		e.preventDefault();
		section.find(".alert").remove();
		if (section.find(".main").children().length == 0) {
			return;
		}
		let data = new FormData(this);
		data.append("calculate", true);
		try {
			let res = await $.ajax({
				type: "POST",
				url: "../../../src/request.php",
				data: data,
				dataType: "json",
				contentType: false,
				processData: false,
				cache: false,
			});

			if (res.status == "error") {
				response({ ...res, className: "danger" }).insertBefore(
					section.find(".main")
				);
				return;
			}
			sessionStorage.setItem("page", "details");
			location.reload();
		} catch (error) {
			console.error(error.responseText);
		}
	};
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

	if (user.status == "grad") {
		Preloading(page);
		$("#main").append(Graduated(user));
		return;
	}

	let section = $(`
          <form id="calculate" method="POST">
            <div class="info">
                <div>
                  <label for="">Level:</label>
                  <input type="text" name="level" class="form-control" value="${
						user.level ?? ""
					}" id="" readonly="readonly"/>
                </div>
                <div>
                  <label for="">Semester:</label>
                  <input type="text" name="semester" class="form-control" value="${
						user.semester ?? ""
					}" id="" readonly="readonly"/>
                </div>

            </div>
            <div class="body">
				<div class="control">
				<button type="button" class="btn btn-primary rounded-pill myModalToggle" >
					<i class="fa fa-plus" aria-hidden="true"></i>
					Add
				</button>
				<button  type="submit" id="" class="btn btn-success rounded-pill">
					<i class="fa fa-calculator" aria-hidden="true"></i>
					Calculate
				</button>
				<button type="button" class="btn btn-danger rounded-pill" id="clear">
				<i class="fa fa-eraser" aria-hidden="true"></i>
					Clear
				</button>
				</div>
              <div class="main">

              </div>           
            </div>
            <div class="myModal" id="addCourses">
              <div class="modalContent">
                <input type="text" name="" placeholder="Total Number of Courses" id="addCoursesInput" class="form-control" />
                <button type="button" class="btn btn-primary" id="totalCourse">Add</button>
              </div>
            </div>
          </form>
  `);

	Preloading(page);
	section.find("#totalCourse").on("click", handleAdd);
	section.find("#clear").on("click", handleClear);
	section.find(".myModalToggle").on("click", function () {
		section.find(".myModal").addClass("open");
	});
	section.on("submit", handleCalculate);
	for (let i = 0; i < 3; i++) {
		section.find(".main").append(CalculationInput({ num: i }));
	}
	$("#main").append(section);
}
