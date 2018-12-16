# Game prototype developed for the 2nd winter game jam in Klagenfurt
This game was part of the 2nd winter game jam in Klagenfurt. You can find a link to a playable version of this game and the other
submissions at [https://itch.io/jam/2nd-winter-game-jam](https://itch.io/jam/2nd-winter-game-jam). For the next game jams happening in 
Klagenfurt have a look at [http://www.itec.aau.at/gamejam/](http://www.itec.aau.at/gamejam/)
# Basic install
Install npm on your machine. This should be possible for windows and linux (and even mac :) )

All commands should be runned in the app directory:
- Install the app with `npm install`.
- In the app directory run `npm run dev` to start the webpack server for the client
and `npm run serverdev`
- 

## Phaser setup with docker-compose
* Install `docker-compose` for your local machine.
* Call `docker-compose up`, this should build the image

### Build the whole image
- `docker-compose build`
- without using docker cache `docker-compose build --no-cache`

### Run an additional install 

`docker-compose exec frontend npm install` and maybe restart the container
### Source code based on
Typescript setup was taken from:
[https://github.com/digitsensitive/phaser3-typescript](https://github.com/digitsensitive/phaser3-typescript)

Docker setup was build with help of:

[https://medium.com/@zwegrzyniak/docker-compose-and-webpack-dev-server-hot-reloads-b73b65d13d79](https://medium.com/@zwegrzyniak/docker-compose-and-webpack-dev-server-hot-reloads-b73b65d13d79)

## python stuff
Create a virtual env (windows https://pypi.org/project/virtualenvwrapper-win/, linux `sudo apt install ipython virtualenvwrapper
`)
- `mkvirtualenv phaser`
- `pip install nodeenv`

Then you have a local npm setup without installing it globally. maybe nicer for debugging.
