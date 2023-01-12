export let response = ({ className, msg }) => {
  let alert = $(`
        <div class="alert alert-${className} alert-dismissible fade show" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <strong>${msg}</strong>
        </div>
    `);
  return alert;
};
