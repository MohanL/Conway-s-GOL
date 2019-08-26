[![Build Status](https://travis-ci.org/MohanL/Conway-s-GOL.svg?branch=master)](https://travis-ci.org/MohanL/Conway-s-GOL)
[![Coverage Status](https://coveralls.io/repos/github/MohanL/Conway-s-GOL/badge.svg?branch=master)](https://coveralls.io/github/MohanL/Conway-s-GOL?branch=master)
# links
github link:https://github.com:MohanL/Conway-s-GOL
heroku link:https://conwayman.herokuapp.com

# how to run
`npm i && npm run start`

# Tests
`npm run test`

# Architechture Design Explanantion

canvas draw <-- web  <----- socket.io ---> backend -> execute Conway's algo

# features
- [x] conway's algo
- [x] user input
- [x] predefined patterns
- [x] average color
- [x] heroku pipelin
- [x] proper tests, nyc, coverage and coverio
  - [x] travisci
  - [x] color function
  - [x] conway algo

# TODO:
   1. neighbor checking can be written in an easier to maintain manner
        agree. too many repetitive lines of code especially for the color logic
    2. cover edge cases as well
       agree, the test coverage is bad.
       should cover the good and bad for conway and the socket logic.
    3. architect scalable solutions, including sync/async responses, web sockets, caching
        I had a few ideas but I didn't have the time to implement it.
         1 . use cookies to store the user identifier so if the user reconnect, the color remains the same
         2.  use websocket instead of socket.io for a better performance, but it will involve more dedicated work.
         3.  node cluster mode to handle more socket connections as the volume grow up. 
    4. common API protocol
        good point. there should be something like rest for http for websocket.
    5. mouse drag event
        good point. yeah, it is hard to draw a pattern.

