   var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var snakes = [];
    class Snake{
        constructor(x,y){
            this.x=x;
            this.y=y;
            this.width=10;
            this.height=10;
            this.color="red";
        }
        draw(){
            ctx.fillStyle=this.color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
        crash(obj){
            var myleft = this.x;
            var myright = this.x + this.width;
            var mytop = this.y;
            var mybottom = this.y + this.height;
            var othleft = obj.x;
            var othright = obj.x + obj.width;
            var othtop = obj.y;
            var othbottom = obj.y + obj.height;
            if ((mybottom-othtop<=0) || (mytop-othbottom>=0) || (myright-othleft<=0) || (myleft-othright>=0)) {
                return false;
            }
            return true;
        }
    }

    class Apple extends Snake{
        constructor(x,y){
            super(x,y);
            this.color="lime";
        }
//        crash(obj){
//            console.log(this);
//            super.crash(obj);
//        }
    }

//    function Apple() {
//        Snake.call(this);
//        this.x = 150;
//        this.y = 100;
//        this.color="lime";
//    }
//    Apple.prototype=new Snake();
//    Apple.prototype.constructor=Apple;          //注意要加这句话

    var snake,xpoint,ypoint,apple,game,first;
    ctx.dir="right";        //初始方向为右;
    
    var Mygame={
        start:function(){
            game = new Game();
            apple = new Apple(150,150);
            for (var i = 0; i < 5; i++) {
                snake = new Snake(60+10*i, 100);
                snakes.push(snake);
            }
            this.interval=setInterval(game.update,250);
            },
        stop:function(){
            clearInterval(this.interval)
        },
        score:0
    };


    function Game() {
        this.update = function () {
            ctx.clearRect(0, 0, 200, 200);
            ctx.fillStyle="red";
            ctx.font="18px Arial ";
            ctx.fillText("score:"+Mygame.score,130,20);
            switch (ctx.dir) {
                case "top":
                    xpoint = snakes[snakes.length - 1].x + 0;
                    ypoint = snakes[snakes.length - 1].y - 10;
                    break;
                case "right":
                    xpoint = snakes[snakes.length - 1].x + 10;
                    ypoint = snakes[snakes.length - 1].y + 0;
                    break;
                case "left":
                    xpoint = snakes[snakes.length - 1].x -10;
                    ypoint = snakes[snakes.length - 1].y + 0;
                    break;
                case "bottom":
                xpoint = snakes[snakes.length - 1].x ;
                ypoint = snakes[snakes.length - 1].y+10;
                break;
            }                            //改变运动的方向
            first= snakes.shift();
            snake = new Snake(xpoint, ypoint);
            snakes.push(snake);
            for (var j = 0; j < snakes.length; j++) {
                if (apple.crash(snakes[j])) {               //检测是否吃到了苹果
                    Mygame.score++;
                    apple.x = Math.floor(Math.random() * 180+10);
                    apple.y = Math.floor(Math.random() * 180+10);
                    snakes.unshift(first);
                }
                if(snakes[snakes.length - 1].x>190||snakes[snakes.length - 1].x<0||snakes[snakes.length - 1].y>190||
                        snakes[snakes.length - 1].y<0     //检测是否与边界发生碰撞
                ){
                    Mygame.stop();
                }
                if(j==snakes.length-1){
                    snakes[j].color="#ff630e";
                }else{
                    snakes[j].color="skyblue";
                }
                snakes[j].draw();
                //检测是否与自己相撞碰
                    if(j<snakes.length-1&&snakes[snakes.length - 1].crash(snakes[j])){
                        Mygame.stop();
                    }
            }
            apple.draw();
        };
    }


    window.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            case 38:
                if(ctx.dir=="bottom") return;
               ctx.dir= "top";
                break;
            case 40:
                if(ctx.dir=="top") return;
                ctx.dir="bottom";
                break;
            case 37:
                if(ctx.dir=="right") return;
                ctx.dir="left";
                break;
            case 39:
                if(ctx.dir=="left") return;
                ctx.dir="right";
                break;
        }
    });

    window.onload=function(){
        Mygame.start();
    }
