export function ApplicationSetup() {
  let container = $(`
        <form class="application-setup">
            <div class="my-input">
                <input type="text" name="firstname" class="form-control" id="firstname" placeholder="Current Level"/>
            </div>
            <div class="my-input">
                <input type="text" name="lastname" class="form-control" id="firstname" placeholder="Total Year of Study"/>
            </div>
            <div class="my-button">
                <button type="button" class="btn btn-primary "> Update</button>
            </div>
        </form>
    `);
  return container;
}
