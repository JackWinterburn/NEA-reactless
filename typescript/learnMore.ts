import { Algorithm } from "./types";

export function setLearnMoreModal(alg: Algorithm) {
  const learnMore = {
    btn: document.getElementById("learn-more-btn"),
    title: document.getElementById("learn-more-title"),
    desc: document.getElementById("learn-more-description"),
    video: document.getElementById("learn-more-video"),
  };
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  const closeModalBtn = document.getElementById("close-modal");

  if (
    learnMore.btn &&
    learnMore.title &&
    learnMore.desc &&
    learnMore.video instanceof HTMLIFrameElement &&
    modal &&
    overlay &&
    closeModalBtn
  ) {
    learnMore.title.innerText = alg.title;
    learnMore.desc.innerText = alg.desc;
    learnMore.video.src = `https://www.youtube.com/embed/${alg.ytVideoID}`;

    learnMore.btn.onclick = () => {
      modal.style.display = "block";
      overlay.style.display = "block";
    };

    closeModalBtn.onclick = () => {
      modal.style.display = "none";
      overlay.style.display = "none";
    };

    window.onclick = (event) => {
      if (modal && event.target === modal) {
        modal.style.display = "none";
        overlay.style.display = "none";
      }
    };
  }
}
