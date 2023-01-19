import { response } from "./Response.js";
export function PasswordReset() {
	const handleOpener = function () {
		let field = $(this).prev();
		let eye = `<i class="fa fa-eye" aria-hidden="true"></i>`;
		let eyeSlash = `<i class="fa fa-eye-slash" aria-hidden="true"></i>`;
		if (field.prop("type") == "password") {
			field.prop({ type: "text" });
			$(this).empty().append(eyeSlash);
		} else {
			field.prop({ type: "password" });
			$(this).empty().append(eye);
		}
	};

	let handleSubmit = async function (e) {
		e.preventDefault();
		let data = new FormData(this);
		data.append("resetpassword", true);
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
			submitButton.prop({ disabled: false }).text(text);
			container.prepend(response({ ...res, className: "success" }));
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

	let container = $(`
    <form class="password-reset" method="POST">
        <div class="my-input">
            <input type="password" name="oldPassword" class="form-control" id="oldPassword" placeholder="Old Password"/>
            <span class="eye"> <i class="fa fa-eye" aria-hidden="true"></i> </span>
        </div>
        <div class="my-input">
            <input type="password" name="userPassword" class="form-control" id="userPassword" placeholder="New Password"/>
            <span class="eye"> <i class="fa fa-eye" aria-hidden="true"></i> </span>
        </div>
        <div class="my-input">
            <input type="password" name="confirmPassword" class="form-control" id="confirmPassword" placeholder="Confirm Password"/>
            <span class="eye"> <i class="fa fa-eye" aria-hidden="true"></i> </span>
        </div>
        <div class="my-button">
            <button type="submit" class="btn btn-primary "> Update</button>
        </div>
    </form>
`);
	container.find(".eye").on("click", handleOpener);
	container.on("submit", handleSubmit);
	return container;
}
