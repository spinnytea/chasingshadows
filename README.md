# Chasing Shadows game

It's a game! With babies! And teddies!

Play coop to solve puzzles!

# Theory

The client is i/o.
The server is the authoritative game state.

Add/Remove objects are broadcast immediately.
Updates are broadcast as partials at the end of the update step.

# TODO

## game objects
* test with two players
* make a level, with sprites (need sprites)

## collisions
* add collisions to walls

## enemies
* make an enemy
* enemies damage player (add knock-back)
* player health
* transition into "dead" state (need sprites)
* add an object registry?
* add unity style "behaviors?"

## attacks
* projectile
* bear attack

## cleanup
1. doesn't keep track of player when you switch tabs
2. transition into standing sprite (need sprites)
3. rename player actions object structure (action/which is confusing)
4. record elapsed time of button press ~ the server should make partial moves
5. Multi-player re-logging in doesn't work

## improve render on the client
* client should have an update loop
* this loop is for RENDERING only
* objects should move based on current trejectory, to move at a higher frame rate
* the server will send in updates, objects will snap to them directly
* if the client predicts correctly (normal case), then it won't jitter
* this will reduce the overall jitter
