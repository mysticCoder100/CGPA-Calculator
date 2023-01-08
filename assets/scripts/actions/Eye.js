export function Eye() {
  $(".eye").click(function () {
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
  });
}
