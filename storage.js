/*
  COSC 219 — Lab 7 · storage.js
  Reading and writing localStorage.

  Storage holds STRINGS and nothing else. Put an array in without
  JSON.stringify and you get back the text "[object Object]".
*/

const KEY = "cosc219.trails";


/* saveTrails(trails) — store the array under KEY. */

export function saveTrails(trails) {

   /* 
   JSON.stringify(trails): transform the array into a string json
   localStorage.setItem(): this save the value with the key define without changing if the page is reload
   */
   localStorage.setItem(KEY, JSON.stringify(trails));
}


/* loadTrails() — the stored array, or [] when there is not a usable one.

   THREE things can go wrong, and all three happen in normal use:

     1. Nothing stored yet. getItem returns null, and JSON.parse(null)
        quietly returns null rather than throwing — so a plain
        `return JSON.parse(raw)` hands null to the rest of your app.

     2. The stored text is not valid JSON. JSON.parse throws, and an
        uncaught throw here means the page never loads at all.

     3. It parses, but is not an array — something else used the key.

   In all three cases, return [].
   ---------------------------------------------------------------------- */

export function loadTrails() {
   const raw = localStorage.getItem(KEY);

   // Check if any string JSON was saved before
   if (raw === null)
      return [];

   // Try-Catch will help us work if the json.parse() produce any error
   try {
      const data = JSON.parse(raw);
      
      // Check if the data is an array
      if (Array.isArray(data))
         return data;

      return [];

   }catch(error){
      return [];
   }
}


/* clearTrails() — remove the key entirely. */

export function clearTrails() {
   localStorage.removeItem(KEY);
}
