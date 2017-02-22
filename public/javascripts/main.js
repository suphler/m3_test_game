/**
 * Created by suphler on 18.02.17.
 */

var mainState = {
    preload: function () {


    },

    create: function () {
        game.add.sprite(0, 0, 'bg');

        this.buildFild();
        this.cursor = game.input.keyboard.createCursorKeys();


    },

    update: function () {

        // this.move();
        this.hover();
        this.animateSelected();


    },


    move: function () {
        if (this.cursor.left.isDown) {
            console.log("pressed left");
            console.log(field[2][2].img.position);
            field[2][2].img.position.x = 20;
        }
    },

    //TODO add check  @can be selected
    //TODO add check  is selected  now and turn  off  current select
    animateSelected: function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (field[i][j].img.isSelected) {
                    field[i][j].img.angle += 10;
                }
            }
        }
    },

    hover: function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (field[i][j].img.isHovered) {
                    field[i][j].img.angle += 5;
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
                    //    TODO add loader  for  custom  @frozen blocs@ from  stage json

                };

                field[i][j].img.anchor.setTo(0.5, 0.5);
                field[i][j].img.inputEnabled = true;
                field[i][j].img.input.useHandCursor = true; //if you want a hand cursory
                field[i][j].img.curXp = curXp;
                field[i][j].img.curYp = curYp;


                // field[i][j].img.events.onInputDown.add(function(fn,param,param2, param3){
                //     return fn(param, param2,param3);
                // }(this.setSelected,field[i][j].img,this,i,j),this);

                field[i][j].img.events.onInputDown.add(this.setSelected, this);
                field[i][j].img.events.onInputOver.add(this.setHovered, this);
                field[i][j].img.events.onInputOut.add(this.setUnHovered, this);
                curXp++;
                // console.log(field);
            }
            curYp++;
        }
        // console.log(this.img.getStringWidth);
        // console.log(field[2][2].img);


    },
    setSelected: function (sprite, event, a) {
        if (!this.isSelectedOnField()) {
            if (this.isSelectedCheck(sprite)) {
                sprite.isSelected = false;
                this.setCurrentSelected({});

            }
            if (!this.isSelectedCheck(sprite)) {
                sprite.isSelected = true;
                this.setCurrentSelected(sprite);
                console.log("selecting");

            }

        } else {
            if (this.isSelectedCheck(sprite)) {
                sprite.isSelected = false;
                this.setCurrentSelected({});
                console.log("unselecting");
            }else if (!this.isSelectedCheck(sprite)) {
                console.log("trying  to  swap");
                this.swapSelected(currentSelected, sprite);
            }
        }


    },

    isSelectedOnField: function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (field[i][j].img.isSelected) {
                    return true;

                }
            }

        }
        return false;

    },

    setSecondSelected: function (sprite) {
        secondSelected = sprite;
        this.swapSelected(currentSelected, secondSelected);

    },

    swapSelected: function (s1, s2) {
        var tmp = {};

        console.log(s1, s2);

        tmp.x = s1.x;
        tmp.y = s1.y;
        tmp.curX = s1.curX;
        tmp.curY = s1.curY;
        s1.x = s2.x;
        s1.y = s2.y;
        s1.curX = s2.curX;
        s1.curY = s2.curY;
        s2.x = tmp.x;
        s2.y = tmp.y;
        s2.curX = tmp.curX;
        s2.curY = tmp.curY;
        currentSelected.isSelected = false;
        currentSelected={};
        this.setUnHovered(s2);
    }

    ,

    setCurrentSelected: function (sprite) {
        currentSelected = sprite;
    },

    setHovered: function (sprite, event) {
        // console.log(event);
        sprite.isHovered = true;
        // console.log(sprite);
        // sprite.x = 10;
    },
    setUnHovered: function (sprite, event) {
        // console.log(event);
        sprite.isHovered = false;
        // console.log(sprite);
        // sprite.x = 10;
    },
    isSelectedCheck: function (sprite) {

        if (sprite.isSelected) {
            return true;
        } else {
            return false;
        }
    },

    getRndImgN: function () {
        var max = 5;
        var min = 1;
        return Math.floor(Math.random() * (max - min)) + min;

    }

};


var game = new Phaser.Game(1200, 1000, Phaser.AUTO, "", 'gameDiv');
game.global = {
    score: 0
};

game.state.add('main', mainState);
game.state.add('menu', menuState);
// game.state.add('result', resultState);

game.state.add('boot', bootState);
game.state.add('load', loadState);
// game.state.add('menu', menuState);

game.state.start('boot');
// game.state.start('main');


