export function PersonalInfo() {
  let container = $(`
        <form class="personal-info">
            <div class="my-input">
                <input type="text" name="firstname" class="form-control" id="firstname" placeholder="First Name"/>
            </div>
            <div class="my-input">
                <input type="text" name="lastname" class="form-control" id="firstname" placeholder="Last Name"/>
            </div>
            <div class="my-input">
                <input type="text" name="firstname" class="form-control" id="firstname" placeholder="Middle Name"/>
            </div>
            <div class="my-input">
                <input type="email" name="firstname" class="form-control" id="firstname" placeholder="Email"/>
            </div>
            <div class="my-button">
                <button type="button" class="btn btn-primary "> Update</button>
            </div>
        </form>
    `);
  return container;
}
