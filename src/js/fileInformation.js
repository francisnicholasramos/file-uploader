document.addEventListener("DOMContentLoaded", () => {
  const entity = document.querySelectorAll(".fileEntity")
  const modal = document.querySelectorAll(".modal");

  entity.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;

      modal.forEach(modal => {
        modal.style.display = "none";
      });

      const targetModal = document.querySelector(
        `.modal[data-id="${id}"]`
      );

      if (targetModal) {
        targetModal.style.display = "flex";
      }
    });
  });

  document.querySelectorAll(".modal-backdrop, .closeModal").forEach(el => {
    el.addEventListener("click", () => {
      el.closest(".modal").style.display = "none"
    })
  })

});
