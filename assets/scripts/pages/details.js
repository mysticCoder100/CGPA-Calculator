import { Preloading } from "../actions/Preloading.js";

export function Details({ page }) {
  let section = $(`
          <section>
              <h5>Details</h5>
          </section>
      `);
  Preloading(page);
  $("#main").append(section);
}
