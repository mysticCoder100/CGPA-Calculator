import { Preloading } from "../actions/Preloading.js";

export function Calculate({ page }) {
  let section = $(`
          <section>
              <h5>Calculate</h5>
          </section>
      `);
  Preloading(page);
  $("#main").append(section);
}
