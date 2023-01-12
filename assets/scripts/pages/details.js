import { Preloading } from "../actions/Preloading.js";
import { ResultAccordion } from "../components/ResultsAccordion.js";

export function Details({ page, user }) {
  let section = $(`
          <section id="details">
            <h3>My Records</h3>
            <div class="records">
              <div class="record">
                <h4>100 Level</h4>
                <div class="score">
                  
                </div>
              </div>
            </div>
          </section>
      `);
  Preloading(page);

  for (let index = 0; index < 2; index++) {
    section.find(".score").append(ResultAccordion());
  }
  $("#main").append(section);
}
