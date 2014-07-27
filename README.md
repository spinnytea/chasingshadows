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
* make some dummy objects when the game starts

## enhanced game loop
* add some walls to run into (put these on the edge of the map
* make an enemy
* enemies run into player
* player health
* transition into "dead" state (need sprites)

## attacks
* projectile
* bear attack
* enemy

## cleanup
1. doesn't keep track of player when you switch tabs
2. transition into standing sprite (need sprites)
3. rename player actions object structure (action/which is confusing)
4. record elapsed time of button press ~ the server should make partial moves

## improve render
* client should have an update loop
* this loop is for RENDERING only
* objects should move based on current trejectory, to move at a higher frame rate
* the server will send in updates, objects will snap to them directly
* if the client predicts correctly (normal case), then it won't jitter
* this will reduce the overall jitter
