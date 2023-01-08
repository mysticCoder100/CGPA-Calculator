import { Preloading } from "../actions/Preloading.js";
import { ApplicationSetup } from "../components/ApplicationSEtup.js";
import { PasswordReset } from "../components/PasswordReset.js";
import { PersonalInfo } from "../components/PersonalInfo.js";
export function Settings({ page }) {
  let userImage = $(".user").find("img")[0].src;

  let handleClick = function () {
    if ($(this).parent().hasClass("active")) return;
    let siblings = $(this).parent().siblings();
    siblings.each((i, el) => $(el).removeClass("active"));
    $(this).parent().addClass("active");
    let display = $(this).data("display");
    section.find(".body").empty();
    switch (display) {
      case "per":
        section.find(".body").append(PersonalInfo());
        break;
      case "pss":
        section.find(".body").append(PasswordReset());

        break;
      case "app":
        section.find(".body").append(ApplicationSetup());

        break;
    }
  };

  let section = $(`
          <section id="settings">
            <div class="head">
              <div class="image">
                <input type="file" name="" id="profileImage" hidden="hidden" />
                <label For="profileImage"><img src="${userImage}" alt="my image" /></label>
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
  section.find(".body").append(PersonalInfo());
  section.find(".setting-link").on("click", handleClick);
  $("#main").append(section);
}
