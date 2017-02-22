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


        this.delMarcked();
        // this.move();
        this.hover();
        this.animateSelected();


    },
    delMarcked: function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (field[i][j].img.markToDel) {
                    field[i][j].img.kill();
                }
            }
        }
    },


    move: function () {
        if (this.cursor.left.isDown) {
            console.log("pressed left");
            console.log(field[2][2].img.position);
            field[2][2].img.position.x = 20;
        }
    },

    //TODO add check  @can be selected
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
            } else if (!this.isSelectedCheck(sprite)) {
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

    swapSelected: function (s1, s2) {//TODO add check that spot is neibor
        var tmp = {};

        // console.log(s1, s2);

        tmp.x = s1.x;
        tmp.y = s1.y;
        tmp.curXp = s1.curXp;
        tmp.curYp = s1.curYp;
        s1.x = s2.x;
        s1.y = s2.y;
        s1.curXp = s2.curXp;
        s1.curYp = s2.curYp;
        s2.x = tmp.x;
        s2.y = tmp.y;
        s2.curXp = tmp.curXp;
        s2.curYp = tmp.curYp;
        currentSelected.isSelected = false;
        currentSelected = {};
        this.setUnHovered(s2);
        console.log("Swaped!");
        this.doGoalCheck();
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

    },

    doGoalCheck: function () {
        var goalStock = [];
        var tmpHorisontale = [];
        var horisontale = [];
        var tmpVerticale = [];
        var verticale = [];
        var stockToRemove = [];

        //all spritess to  one stock  and  sort  them after that
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                goalStock.push(field[i][j].img);

            }
        }
        //from here  horizontal check
        goalStock.sort(this.horisontalSort);
        for (var k = 0; k < goalStock.length; k++) {
            if (k>=2) {
                if (goalStock[k].curXp == goalStock[k - 1].curXp && goalStock[k - 1].curXp == goalStock[k - 2].curXp
                    && goalStock[k].curYp == goalStock[k - 1].curYp + 1 || goalStock[k].curYp == goalStock[k - 1].curYp - 1
                    && goalStock[k - 1].curYp == goalStock[k - 2].curYp + 1 || goalStock[k - 1].curYp == goalStock[k - 2].curYp - 1) {
                    tmpHorisontale.push(goalStock[k]);
                    tmpHorisontale.push(goalStock[k - 1]);
                    tmpHorisontale.push(goalStock[k - 2]);
                }
            }
            //
            // if (goalStock[k].key == goalStock[k + 1].key && goalStock[k + 1].key == goalStock[k + 2].key
            //     && goalStock[k].curYp ==goalStock[k + 1].curYp+1||goalStock[k].curYp ==goalStock[k + 1].curYp-1) {
            //     tmpHorisontale.push(goalStock[k]);
            //     tmpHorisontale.push(goalStock[k + 1]);
            //     tmpHorisontale.push(goalStock[k + 2]);
            // }
            console.log(tmpHorisontale);
            if (tmpHorisontale.length >= 3) {
                for (var w = 0; w < tmpHorisontale.length; w++) {
                    horisontale.push(tmpHorisontale[w]);
                }
            }
            tmpHorisontale = [];


        }
        console.log("horisontale: ");
        console.log(horisontale);

        //from here  Verticale check
        goalStock.sort(this.verticalSort);
        for (var k = 0; k < goalStock.length ; k++) {
            if (k>=2) {
                if (goalStock[k].curYp == goalStock[k - 1].curYp && goalStock[k - 1].curYp == goalStock[k - 2].curYp
                    && goalStock[k].curXp == goalStock[k - 1].curXp + 1 || goalStock[k].curXp == goalStock[k - 1].curXp - 1
                    && goalStock[k - 1].curXp == goalStock[k - 2].curXp + 1 || goalStock[k - 1].curXp == goalStock[k - 2].curXp - 1) {
                    tmpVerticale.push(goalStock[k]);
                    tmpVerticale.push(goalStock[k - 1]);
                    tmpVerticale.push(goalStock[k - 2]);
                }
            }



            // if (goalStock[k].key == goalStock[k + 1].key && goalStock[k + 1].key == goalStock[k + 2].key) {
            //     tmpVerticale.push(goalStock[k]);
            //     tmpVerticale.push(goalStock[k + 1]);
            //     tmpVerticale.push(goalStock[k + 2]);
            // }
            console.log(tmpVerticale);
            if (tmpVerticale.length >= 3) {
                for (var w = 0; w < tmpVerticale.length; w++) {
                    verticale.push(tmpVerticale[w]);
                }
            }
            tmpVerticale = [];


        }
        console.log("verticale: ");
        console.log(verticale);
        stockToRemove = stockToRemove.concat(horisontale);
        stockToRemove = stockToRemove.concat(verticale);
        console.log(stockToRemove);
        this.marckToDel(stockToRemove);
    },

    marckToDel: function (arrToDel) {
        if (arrToDel.length > 0) {
            for (var i = 0; i < arrToDel.length; i++) {
                arrToDel[i].markToDel = true;
            }
        }
    },


    horisontalSort: function (a, b) {
        if (a.curXp > b.curXp) return 1;
        if (a.curXp < b.curXp) return -1;
    },

    verticalSort: function (a, b) {
        if (a.curYp > b.curYp) return 1;
        if (a.curYp < b.curYp) return -1;
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


