export function Preloading(page) {
  let head = page.slice(0, 1).toUpperCase();
  $(".title").text(head + page.slice(1));
  $("#main").children().not(".overlay").remove();
  $(".overlay").addClass("close");
  $("#main").addClass("open");
}
