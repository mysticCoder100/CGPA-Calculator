export function ResultAccordion() {
  let accordion = $(`
        <div class="score-list">
            <h4 class="score-list-header">
                <span class="score-title">Title</span>
                <span class=""> <i class="fas fa-angle-down"></i> </span>
            </h4>
            <div class="score-body ">
               <h4>GPA: 3.00</h4>
               <div class="table-responsive">
                <table class="table table-striped
                table-hover	
                table-borderless
                table-primary
                align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>S/N</th>
                            <th>Course Code</th>
                            <th>Course Title</th>
                            <th>Course Unit</th>
                            <th>Score</th>
                            <th>Grade</th>
                            <th>TCP</th>
                            <th>TLU</th>
                        </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr class="table-primary" >
                                <td scope="row">Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                </tr>
                            <tr class="table-primary">
                                <td scope="row">Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                                <td>Item</td>
                            </tr>
                        </tbody>
                </table>
               </div>
               
            </div>
        </div>
    `);
  accordion.find(".score-list-header").on("click", function () {
    let siblings = $(this).parents(".score-list").siblings();
    $(siblings).each((i, el) => {
      let body = $(el).find(".score-body");
      body.removeClass("open");
      $(el).find(".score-list-header").removeClass("open");
    });
    accordion.find(".score-body").toggleClass(`open`);
    $(this).toggleClass("open");
  });
  return accordion;
}
