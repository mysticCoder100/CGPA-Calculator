import { Eye } from "./actions/Eye.js";
Eye();

$("#email").keyup(function () {
  let email = $(this).val();
  let me = $(this);
  let data = {
    email,
    exist: true,
  };
  let response = $(
    `<p class="response__error jsError" > Email Already Exists</p>`
  );
  exist(data, me, response);
});

$("#uname").keyup(function () {
  let username = $(this).val();
  let me = $(this);
  let data = {
    username,
    exist: true,
  };
  let response = $(
    `<p class="response__error jsError" > Username Already Exists</p>`
  );
  exist(data, me, response);
});

function exist(data, me, response) {
  $.post("../../src/request.php", data, null, "json").done(function (data) {
    if (data > 0) {
      me.parent().addClass("error");

      me.parent().next().remove();
      response.insertAfter(me.parent());
      $("#registerSubmit").prop({ disabled: true });
    } else {
      me.parent().removeClass("error");
      me.parent().next().remove();
      $("#registerSubmit").prop({ disabled: false });
    }
  });
}
