document.addEventListener("DOMContentLoaded", () => {
  /* инициализируем Bootstrap-модалку */
  const modalEl = document.getElementById("viewerModal");
  const modalBody = modalEl.querySelector(".modal-body");
  const viewerModal = new bootstrap.Modal(modalEl);

  /* обработка клика по карточке */
  document.querySelectorAll(".my-card").forEach((card) => {
    card.addEventListener("click", () => {
      let html = "";

      const video = card.querySelector("video");
      const img = card.querySelector("img");

      if (video) {
        /* копируем исходный <video> со всеми <source> */
        html = video.outerHTML;
      } else if (img) {
        html = `<img src="${img.getAttribute(
          "src"
        )}" class="img-fluid" alt="">`;
      }

      modalBody.innerHTML = html;
      viewerModal.show();

      /* если вставлен видео-элемент — автоматически играем */
      const insertedVideo = modalBody.querySelector("video");
      if (insertedVideo) insertedVideo.play();
    });
  });

  /* при закрытии модалки останавливаем видео и чистим DOM */
  modalEl.addEventListener("hidden.bs.modal", () => {
    const vid = modalBody.querySelector("video");
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
    modalBody.innerHTML = "";
  });
});
