let initialPosition = null;
let mouseDown = false;
let altDown = false;
let targetElement = null;

function handleMouseUp(e) {
  if (mouseDown) {
    document.body.style.cursor = "grab";
  }

  mouseDown = false;
}
// grab, grabbing
function handleMouseDown(e) {
  targetElement = e.target;

  if (altDown) {
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    mouseDown = true;
    const { clientX, clientY } = e;
    initialPosition = { clientX, clientY };
  }
}

function handleMove(e) {
  if (mouseDown && initialPosition) {
    window.requestAnimationFrame(() => {
      document.documentElement.scrollBy({
        left: -e.movementX,
        top: -e.movementY,
      });
    });
  }
}

function disablePanning() {
  mouseDown = false;
  altDown = false;
  document.removeEventListener("mousedown", handleMouseDown);
  document.removeEventListener("mousemove", handleMove);
  document.body.style.cursor = "auto";
  document.body.style.userSelect = "auto";
}

document.addEventListener("mouseup", handleMouseUp);

document.addEventListener("keyup", (e) => {
  disablePanning();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Alt") {
    altDown = true;
    document.body.style.cursor = "grab";
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMove);
  }
});
