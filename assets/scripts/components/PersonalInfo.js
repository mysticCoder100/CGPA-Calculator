import { response } from "./Response.js";
export function PersonalInfo(prop) {
  let user = {};
  let handleSubmit = async function (e) {
    e.preventDefault();
    let submitButton = $(this).find("button[type='submit'");
    let text = submitButton.text();
    submitButton.prop({ disabled: true })
      .html(`<div class="spinner-border spinner-border-sm text-white" role="status">
    </div>`);
    let data = new FormData(this);
    data.append("update", true);

    let update;
    try {
      update = await $.ajax({
        type: "POST",
        url: "../../../src/request.php",
        data: data,
        dataType: "json",
        contentType: false,
        processData: false,
        cache: false,
      });
    } catch (error) {
      console.error(error);
    }

    container.find(".cusError").remove();
    container.find(".alert").remove();

    if (update.status == "error") {
      if (typeof update.msg == "object") {
        let msg = update.msg;
        $.each(msg, (key, msg) => {
          let error = errorResponse({ msg });
          let input = container.find(`#${key}`);
          $(input).parent().after(error);
        });
      } else {
        container.prepend(response({ ...update, className: "danger" }));
      }
      submitButton.prop({ disabled: false }).text(text);
      return;
    }
    for (let key in user) {
      prop[key] = user[key];
    }
    submitButton.prop({ disabled: false }).text(text);
    container.prepend(response({ ...update, className: "success" }));
  };

  let handleInput = function () {
    let value = $(this).val();
    let name = $(this).prop("name");
    user[name] = value;
  };

  let errorResponse = ({ msg }) => {
    let element = $(`
      <p class="text-danger cusError">${msg}</p>
    `);
    return element;
  };

  let container = $(`
        <form class="personal-info">
            <div class="my-input">
                <input type="text" name="firstname" class="form-control" id="firstname" placeholder="First Name" value="${
                  prop.firstname ?? ""
                }"/>
                </div>
            <div class="my-input">
                <input type="text" name="lastname" class="form-control" id="lastname" placeholder="Last Name" value="${
                  prop.lastname ?? ""
                }"/>
            </div>
            <div class="my-input">
                <input type="text" name="middlename" class="form-control" id="firstname" placeholder="Middle Name" value="${
                  prop.middlename ?? ""
                }"/>
            </div>
            <div class="my-input">
                <input type="email" name="email" class="form-control" id="email" placeholder="Email" value="${
                  prop.email ?? ""
                }"/>
            </div>
            <div class="my-button">
                <button type="submit" class="btn btn-primary "> Update</button>
            </div>
        </form>
    `);
  container.on("submit", handleSubmit);
  container.find("input").each((i, el) => {
    $(el).on("input", handleInput);
  });
  return container;
}
