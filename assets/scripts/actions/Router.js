import { Dashboard } from "../pages/dashboard.js";
import { Details } from "../pages/details.js";
import { Settings } from "../pages/settings.js";
import { Calculate } from "../pages/calculate.js";
export function Router(page) {
  page = page || "dashboard";
  console.log(page);
  $(`#${page}_link`).addClass("active");
  switch (page) {
    case "dashboard":
      Dashboard({ page });
      break;
    case "calculate":
      Calculate({ page });
      break;
    case "details":
      Details({ page });
      break;
    case "settings":
      Settings({ page });
      break;
    default:
      Dashboard({ page });
      break;
  }
}
