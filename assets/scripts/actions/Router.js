import { Dashboard } from "../pages/dashboard.js";
import { Details } from "../pages/details.js";
import { Settings } from "../pages/settings.js";
import { Calculate } from "../pages/calculate.js";
export async function Router(page) {
	try {
		let user = await $.post(
			"../../../src/request.php",
			{ getDetails: true },
			null,
			"json"
		);
		page = page || "dashboard";
		$(`#${page}_link`).addClass("active");
		switch (page) {
			case "dashboard":
				Dashboard({ page, user });
				break;
			case "calculate":
				Calculate({ page, user });
				break;
			case "details":
				Details({ page, user });
				break;
			case "settings":
				Settings({ page, user });
				break;
			default:
				Dashboard({ page, user });
				break;
		}
	} catch (error) {
		console.error(error);
	}
}
