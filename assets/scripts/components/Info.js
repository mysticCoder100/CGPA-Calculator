export function Info() {
  let section = $(`
        <div class="setup-message">
               
           <div class="setup-message-content-container">
              <div class="setup-message-content">
                <h5>Kindly keep the following to heart</h5>
                <ul>
                  <li>  
                      <p> 
                          Aplication Setup details Can only be modified once.
                      </p> 
                  </li>
                  <li> 
                    <p> 
                     Once you've update the record you won't be able to do so anymore.
                    </p> 
                  </li>
                  <li> 
                    <p> 
                      They Must be updated for the system to calculate your GPA.
                    </p> 
                  </li>
                </ul>
              </div>
           </div>

            <button type="button" class="setup-message-toggler">
              <i class="fas fa-question "></i>
            </button>
        </div>
    `);

  section.find("button").on("click", function (e) {
    e.stopPropagation();
    $(this).siblings().toggleClass("open");
  });
  section
    .find(".setup-message-content-container")
    .on("click", (e) => e.stopPropagation());
  return section;
}
