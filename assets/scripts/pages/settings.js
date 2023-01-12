import { Preloading } from "../actions/Preloading.js";
import { ApplicationSetup } from "../components/ApplicationSEtup.js";
import { PasswordReset } from "../components/PasswordReset.js";
import { PersonalInfo } from "../components/PersonalInfo.js";
import { response } from "../components/Response.js";

export async function Settings({ page, user }) {
  let userImage = $(".user").find("img")[0].src;

  let handleImageChange = async function () {
    section.find(".alert").remove();
    let file = this.files[0];
    let data = new FormData();
    data.append("image", file);
    data.append("uploadImage", true);
    let res;
    try {
      res = await $.ajax({
        type: "POST",
        url: "../../../src/request.php",
        data: data,
        dataType: "Json",
        processData: false,
        contentType: false,
        cache: false,
      });
    } catch (error) {
      console.error(error);
    }
    console.log(res);
    if (res.status == "error") {
      let alert = response({ msg: res.msg.image, className: "danger" });
      section.find("form").prepend(alert);
      return;
    }

    let alert = response({ ...res, className: "success" });
    let newImage = location.origin + "/assets/images/users/" + res.img;
    console.log(newImage);
    $(".user-image").prop({ src: newImage });
    section.find("form").prepend(alert);
  };

  let handleClick = function () {
    if ($(this).parent().hasClass("active")) return;
    let siblings = $(this).parent().siblings();
    siblings.each((i, el) => $(el).removeClass("active"));
    $(this).parent().addClass("active");
    let display = $(this).data("display");
    section.find(".body").empty();
    switch (display) {
      case "per":
        section.find(".body").append(PersonalInfo(user));
        break;
      case "pss":
        section.find(".body").append(PasswordReset());

        break;
      case "app":
        section.find(".body").append(ApplicationSetup(user));

        break;
    }
  };

  let section = $(`
          <section id="settings">
            <div class="head">
              <div class="image"  enctype="multipart/form-data">
                <input type="file" name="profileImage" id="profileImage" hidden="hidden" />
                <label For="profileImage"><img src="${userImage}" class="user-image"  alt="my image" /></label>
              </div>
              <ul class="settings-links" >
                <li class="active">
                  <button class="setting-link btn"  data-display="per" type="button" ">Personal Information</button>
                </li>
                <li>
                  <button class="setting-link btn" data-display="app"  type="button" ">Application Setup</button>
                </li>
                <li>
                  <button class="setting-link btn" data-display="pss"  type="button" ">Password</button>
                </li>
              </ul>           
            </div>
            <div class="body">
            </div>
          </section>
      `);
  Preloading(page);
  section.find(".body").append(PersonalInfo(user));
  section.find(".setting-link").on("click", handleClick);
  section.find("#profileImage").on("change", handleImageChange);
  $("#main").append(section);
}
