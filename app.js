/*
  COSC 219 — Lab 7 · app.js
  The only file that touches the page. Open index.html with Live Server.
*/

// import from ./storage.js, ./render.js and ./trails.js
import * as storage from "./storage.js";
import * as render from "./render.js";
import * as trailsModule from "./trails.js";

/* Load the saved trails into a `let` — the array is replaced, not edited,
   every time something changes. */
let trails = storage.loadTrails();

/* update() — redraw the list, rewrite the summary, and save.
   Call it whenever the data changes, and once at the very bottom of this
   file so the page is not blank on load. */
function update(){
   render.renderTrails(trails, document.querySelector("#trail-list")); // Search for the id = "trail-list" and show all trails saved
   document.querySelector("#summary").textContent = render.summaryText(trails); // Update the p elemnt which at first doesnt have info but then update d with what is found
   storage.saveTrails(trails); // Save the updated trail
}

/* The add form.

   A submit reloads the page by default, throwing away everything in
   memory. Stop that first, then validate, then add.

   When the input is invalid: put a message in #error, focus the name
   field, and return without changing anything.
   When it is valid: clear #error, add the trail, reset the form. */
const form = document.querySelector("#add-form");

form.addEventListener("submit", function(event) {
   event.preventDefault();

   const name = document.querySelector("#name").value;
   const km = document.querySelector("#km").value;

   if ( !trailsModule.isValidTrail(name, km)){
      document.querySelector("#error").textContent = "Please enter a valid trail name and distance.";
      document.querySelector("#name").focus();
      return;
   }

   document.querySelector("#name").focus();

   const newTrail = trailsModule.makeTrail(name, km);

   trails = trailsModule.addTrail(trails, newTrail);

   form.reset();

   update();
});
/* The list.

   ONE listener on #trail-list — not one per button. The buttons are
   destroyed and rebuilt on every render, so a listener on a button would
   not survive the first redraw.

   Use findAction(event.target) to work out what was clicked.

   Clear #error here too — once the user clicks something in the list they
   have moved on from the form, and a stale validation message left on
   screen is just noise. */

const trailList = document.querySelector("#trail-list");

trailList.addEventListener("click", function(event) {

   const result = trailsModule.findAction(event.target);

   if (result === null) {
     return;
   }

   document.querySelector("#error").textContent = "";

   if (result.action === "toggle") {
     trails = trailsModule.toggleTrail(trails, result.id);
   }

   if (result.action === "delete") {
     trails = trailsModule.removeTrail(trails, result.id);
   }

   update();
});



/* The Clear all button: empty the array, clear storage, update. */
const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", function() {
    trails = [];

    update();

    storage.clearTrails();
});

update();