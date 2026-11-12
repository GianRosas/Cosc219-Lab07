Cosc219-Lab07
Laboratory 07 - Trail Tracker using JavaScript, DOM Events, and Local Storage.

This is a website where users can add trails, see their distance, close or reopen them, and delete them. The trails are saved when the page reloads.

Event Listener
I used one general event listener for the trail list instead of one for each button. I made this decision because every time the list changes, the buttons are created again. Doing this helps the buttons keep working when adding or deleting trails.

Local Storage
We use localStorage to save the trails even when the page reloads. In case there is an error with the saved data or the saved data is not a list, the website returns an empty list instead of stopping the entire website.

AI Declaration
I used ChatGPT to improve my understanding of the lab tasks and how the functions work. I also used it to check my code, find mistakes, and get tips on how to improve it. I worked on the coding and testing myself, using class notes and ChatGPT for help.
