(function () {
  const DIRECTION_FORWARD = "forward";
  const DIRECTION_BACKWARD = "backward";
  const WIKIBOX_CLASS_NAME = "wikibox";
  let boxIds = [];
  let currentBoxId = "1";

  const wikiboxes = document.getElementsByClassName(WIKIBOX_CLASS_NAME);
  const prevWikiboxBtn = document.getElementById("prev-wikibox-btn");

  function slideWikiboxes(prevId, nextId, direction) {
    const prevBox = document.querySelectorAll(
      `[data-wikibox-id="${prevId}"]`
    )[0];
    const nextBox = document.querySelectorAll(
      `[data-wikibox-id="${nextId}"]`
    )[0];

    prevBox.classList.add(
      "animate",
      direction === DIRECTION_FORWARD ? "flipOutYF" : "flipOutYB"
    );
    nextBox.classList.add(
      "animate",
      direction === DIRECTION_FORWARD ? "flipInYF" : "flipInYB"
    );

    setTimeout(() => {
      prevBox.classList.remove(
        "active-box",
        "animate",
        direction === DIRECTION_FORWARD ? "flipOutYF" : "flipOutYB"
      );
      nextBox.classList.remove(
        "animate",
        direction === DIRECTION_FORWARD ? "flipInYF" : "flipInYB"
      );
      nextBox.classList.add("active-box");
    }, 400);
  }

  function updatePrevWikiboxBtn() {
    if (boxIds.indexOf(currentBoxId) === 0) {
      return (prevWikiboxBtn.style.visibility = "hidden");
    }
    return (prevWikiboxBtn.style.visibility = "visible");
  }

  for (let i = 0; i < wikiboxes.length; i++) {
    const wikibox = wikiboxes[i];
    const {
      wikiboxId: id,
      wikiboxPrev: prev,
      wikiboxNext: next,
    } = wikibox.dataset;

    if (next) {
      wikiboxes[i].addEventListener("click", () => {
        slideWikiboxes(id, next, DIRECTION_FORWARD);
        currentBoxId = next;
        updatePrevWikiboxBtn();
      });
    }
    boxIds.push(id);
  }

  prevWikiboxBtn.addEventListener("click", () => {
    const prevId = boxIds[boxIds.indexOf(currentBoxId) - 1];
    slideWikiboxes(currentBoxId, prevId, DIRECTION_BACKWARD);
    currentBoxId = prevId;
    updatePrevWikiboxBtn();
  });
})();
