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
  let container = $(`
    <form class="password-reset">
        <div class="my-input">
            <input type="password" name="firstname" class="form-control" id="firstname" placeholder="Old Password"/>
            <span class="eye"> <i class="fa fa-eye" aria-hidden="true"></i> </span>
        </div>
        <div class="my-input">
            <input type="password" name="lastname" class="form-control" id="firstname" placeholder="New Password"/>
            <span class="eye"> <i class="fa fa-eye" aria-hidden="true"></i> </span>
        </div>
        <div class="my-input">
            <input type="password" name="firstname" class="form-control" id="firstname" placeholder="Confirm Password"/>
            <span class="eye"> <i class="fa fa-eye" aria-hidden="true"></i> </span>
        </div>
        <div class="my-button">
            <button type="button" class="btn btn-primary "> Update</button>
        </div>
    </form>
`);
  container.find(".eye").on("click", handleOpener);
  return container;
}
