import { Preloading } from "../actions/Preloading.js";
import { ResultAccordion } from "../components/ResultsAccordion.js";

export function Dashboard({ page, user }) {
  page = page || "dashboard";
  let section = $(`
        <section id="dashboard">
          <div class="summaries">
              <div class="summary">
                  <h4>Total Semester Left</h4>
                  <div class="body">
                    <span> <i class="fas fa-cubes" ></i> </span>
                    <h6>3</h6>
                  </div>
              </div>
              <div class="summary">
                <h4>Current GPA</h4>
                <div class="body">
                  <span> <i class="fas fa-chart-simple" ></i> </span>
                  <h6>3</h6>
              </div>
              </div>
              <div class="summary">
                <h4>CGPA</h4>
                <div class="body">
                  <span> <i class="fas fa-calculator" ></i> </span>
                  <h6>3</h6>
              </div>
              </div>
          </div>    
       </div>
          <div class="scores">
            <h2>Latest Results</h2>
            <div class="score" >
            

               
            </div>  
            </div>
          </div>
      
        </section>
    `);
  Preloading(page);
  for (let num = 0; num < 3; num++) {
    section.find(".score").append(ResultAccordion());
  }
  $("#main").append(section);
}
