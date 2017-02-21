/**
 * Created by suphler on 18.02.17.
 */
var field = [];
var spotList = [];


var mainState = {
    preload: function () {
        spotList[0] = game.load.image('img01', 'images/assets/sprites/01.png');
        spotList[1] = game.load.image('img02', 'images/assets/sprites/02.png');
        spotList[2] = game.load.image('img03', 'images/assets/sprites/03.png');
        spotList[3] = game.load.image('img04', 'images/assets/sprites/04.png');
        spotList[4] = game.load.image('img05', 'images/assets/sprites/05.png');
        spotList[5] = game.load.image('img06', 'images/assets/sprites/06.png');
        spotList[6] = game.load.image('bg', 'images/assets/bg/bg1.jpg');

    },

    create: function () {
        game.add.sprite(0, 0, 'bg');
        this.img1 = game.add.sprite(30, 30, 'img01');
        this.img1.anchor.setTo(0.5, 0.5);
        this.buildFild();
        this.cursor = game.input.keyboard.createCursorKeys();


    },

    update: function () {
        this.img1.angle += 1;
        // this.move();
        this.hover();


    },


    move: function () {
        if (this.cursor.left.isDown) {
            console.log("pressed left");
            console.log(field[2][2].img.position);
            field[2][2].img.position.x = 20;
        }
    },

    hover: function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (field[i][j].img.isSelected) {
                    field[i][j].img.angle += 1;
                }
            }
        }
    },


    buildFild: function () {
        var curX = 0;
        var curXp = 0;
        var curY = 0;
        var curYp = 0;
        for (var i = 0; i < 9; i++) {
            field[i] = {};
            curY += 110;

            curX = 0;
            curXp = 0;
            for (var j = 0; j < 9; j++) {
                curX += 110;
                field[i][j] = {
                    img: game.add.sprite(30 + curX, 30 + curY, 'img0' + this.getRndImgN()),

                    x: curXp,
                    y: curYp,
                    isSelected: false,
                    cordinateX: 0,
                    cordinateY: 0
                };
                field[i][j].cordinateX = field[i][j].img.position.x;
                field[i][j].cordinateY = field[i][j].img.position.y;
                field[i][j].img.inputEnabled = true;
                field[i][j].img.input.useHandCursor = true; //if you want a hand cursory
                field[i][j].img.events.onInputOver.add(setAnimate, this);
                function setAnimate(sprite, event) {
                    console.log(event);
                    sprite.isSelected = true;
                    console.log(sprite);
                    sprite.x = 10;
                }

                curXp++;


                // console.log(field);


            }
            curYp++;
        }
        // console.log(this.img.getStringWidth);
        // console.log(field[2][2].img);

    },

    getRndImgN: function () {
        var max = 5;
        var min = 1;
        return Math.floor(Math.random() * (max - min)) + min;

    }

}




var game = new Phaser.Game(1500, 1000, Phaser.AUTO, "", 'gameDiv');
game.global = {
    score: 0
};

game.state.add('main', mainState);
game.state.add('menu', menuState);
// game.state.add('result', resultState);

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
// game.state.add('play', playState);
// Start the 'boot' state
game.state.start('boot');
// game.state.start('main');


