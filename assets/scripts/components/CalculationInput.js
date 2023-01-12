export function CalculationInput({ num }) {
  let handleRemove = function () {
    let element = $(this).parent();
    element.addClass("remove");
    setTimeout(function () {
      element.remove();
    }, 500);
  };
  let input = $(`
  <div class="calculation-input" data-num="${num}">
    <div class="group">
      <input type="text" class="form-control" placeholder="Course Code" name="course[${num}][code]" id="" />
      <input type="text" class="form-control" placeholder="Course Unit" name="course[${num}][unit]" id="" />
      <input type="text" class="form-control" placeholder="Score" name="course[${num}][score]" id="" />
    </div>
    <span class="close"><i class="fa fa-times" aria-hidden="true"></i></span>
  </div>
  `);
  input.find(".close").on("click", handleRemove);
  return input;
}
