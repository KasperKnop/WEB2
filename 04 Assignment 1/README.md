# 04 Assignment 1 - Tic-Tac-Two!

For your first assignment you must build two browser based Tic-Tac-Toe games - one using object-oriented programming and another using functional programming.

Tic-tac-toe is played on a three-by-three grid by two players, who take turns placing their symbol (X or O) in one of the available spaces on the grid. The first player to get three of their symbols in a row, either horizontally, vertically, or diagonally, wins the game.

In the following example, the first player (X) wins the game in seven steps:

![Tic-Tac-Toe](/04%20Assignment%201/tic-tac-toe.png)

**Additional requirements:**

-   The two game versions must be indistinguishable to the player
-   The games must display a status message - either indicating the next players turn or the winner of the game
-   The games must have a restart button
-   You can only use HTML, CSS, and JavaScript
-   No external libraries are allowed

There are no requirements for the styling of the games.

Feel free to add extra features, e.g. an AI opponent or a score tracker.

Thoroughly test your games, verifying that they have identical behavior and work as intended. Submit the assignment as **two html files** (oo.html & fun.html) on itslearning. Create the assignment alone or in groups of 2-4. The assignment is evaluated on an approved/not approved basis. It must be approved in order to attend the course exam.

**Evaluation criteria:**

-   Fulfilled requirements: Are all requirements implemented in both games?
-   Effective use of functional and object-oriented programming: Are you demonstrating a good understanding of object-oriented and functional programming techniques?
-   Code organization and readability: Is the code well-organized and easy to understand?
-   Bug-free code: Is the code thoroughly tested and free of bugs?

<blockquote>
<details>
<summary>Display hints...</summary>
<p>It is not advised to create the two games in isolation, as their implementations have significant overlap.</p>
<p>In the object-oriented version, implement a Game class (or factory function) with methods for rendering the game, making a move, reading the status of the game, etc. Consider creating a Board class that the Game class can use to manage the board, if you find your Game class doing too much.</p>
<p>In the functional version, create a data structure for the game, and several functions for rendering the game, making a move, reading the status of the game, etc, which take the data structure as a parameter. You should make use of functional programming concepts, such as pure functions, higher-order functions and immutability where appropriate, but you must of course still imperatively manipulate the DOM and listen for player input.</p>
<p>One significant difference between the two versions is the implementation of making a move. In the object-oriented version, the move method should change the state of the game. In the functional version, the move function should return the new state of the game.</p>
</details>
</blockquote>
