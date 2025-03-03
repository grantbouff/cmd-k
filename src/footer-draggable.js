import { Draggable } from "gsap/Draggable";

document.addEventListener('DOMContentLoaded', () => {

    Draggable.create("[footer-drag]", {
        // type: "y",
        bounds: document.querySelector(".primary-footer"),
        // inertia: true,
        onClick: function () {
          console.log("clicked");
        },
        onDragEnd: function () {
          console.log("drag ended");
        },
      });
   
});