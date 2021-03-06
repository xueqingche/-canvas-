
    var bgm1 = new Sound("music/BGM1.mp3");
    var bgm2=new Sound("music/BGM3.mp3");
    bgm1.sound.setAttribute("id", "bgm1");
    var myGamePiece, myObstacle1, myObstacle2, myscore, obstacles = [];
    var myGameArea = {
        canvas: document.createElement("canvas"),
        flag: 0,
        score: 0,
        gap: 100,
        start: function () {
            this.score = 0;
            this.canvas.width = 480;
            this.canvas.height = 270;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop: function () {
            clearInterval(this.interval);
        },
        getscore:function(){
            this.context.fillStyle="red";
            this.context.font="20px Arial";
            this.context.fillText("score:"+this.score,370,20)
        },
        drawimag:function(){
            var imag=new Image();
            imag.src="./imags/a8773912b31bb051da2f61e3377adab44bede0f6.jpg";
            this.context.drawImage(imag,0,0,480,270);
        }
    };

    function Component(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.totalY = 0;
        this.x = x;
        this.y = y;
        this.color = "green";
        this.restart = function () {
            this.x = 10;
            this.y = 70;
        };
        this.update = function () {
            var ctx = myGameArea.context;
            this.totalY += this.speedY;
            this.x += this.speedX;
            this.y += this.totalY;
            if (this.y >= 240) {
                this.y = 240;
                this.totalY = -this.totalY * 0.7;
            } else if (this.y <= 0) {
                this.y = 0;
                this.totalY = -this.totalY * 0.7;
            }
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
        this.crashWith = function (otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) ||
                    (mytop > otherbottom) ||
                    (myright < otherleft) ||
                    (myleft > otherright)) {
                crash = false;
            }
            return crash;
        }
    }


    function start() {
        myGameArea.start();
        document.getElementById("control").style.display="block";
        bgm1.play();
        bgm1.replay();                                   //重新开始播放
        bgm1.sound.volume = 0.02;                                                            //音量
        myGamePiece = new Component(30, 30, 10, 70);
        myGamePiece.color = "red";
        myGamePiece.speedY = 0.2;
    }



    function updateGameArea() {
        //清除画布 必须放在最前面
        myGameArea.clear();
        //另外画背景 也必须在画其他元素前面 ,否则背景就会覆盖其余元素
        myGameArea.drawimag();
        myGameArea.score++;
        //碰撞检测
        for (i = 0; i < obstacles.length; i++) {
            if (myGamePiece.crashWith(obstacles[i])) {
                bgm1.stop();
                bgm2.replay();
                bgm2.play();
                myGameArea.stop();
                document.getElementById("control").style.display="none";
                document.getElementsByClassName("restart")[0].style.display = "block";
                return;
            }
        }
        var y1 = Math.floor(Math.random() * 20 + 180);
        var y2 = y1 - myGameArea.gap;
        if (myGameArea.flag == 0) {
            myObstacle1 = new Component(10, 200, 460, y1);
            myObstacle2 = new Component(10, y2, 460, 0);
            obstacles.push(myObstacle1);
            obstacles.push(myObstacle2);
        }
        myGameArea.flag += 1;
        if (myGameArea.flag == 120) {
            myObstacle1 = new Component(10, 200, 460, y1);
            myObstacle2 = new Component(10, y2, 460, 0);
            obstacles.push(myObstacle1);
            obstacles.push(myObstacle2);
            myGameArea.flag = 0;
        }
        if (obstacles.length <= 20) {
            for (var i = 0; i < obstacles.length; i++) {
                obstacles[i].x += -1;
                obstacles[i].update();
            }
        } else {
            for (var j = obstacles.length - 1; j > obstacles.length - 21; j--) {
                obstacles[j].x += -1;
                obstacles[j].update();
            }
        }
        if (myGamePiece.x <= 0) {
            myGamePiece.x = 0
        }
        myGamePiece.update();
        myGameArea.getscore();
    }


    function moveup() {
        myGamePiece.speedY = -0.2;
    }

    function movedown() {
        myGamePiece.speedY = 0.2;
    }

    function moveleft() {
        myGamePiece.speedX = -1;
    }

    function moveright() {
        myGamePiece.speedX = 1;
    }

    function clearmove() {
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0.2;
    }

    window.addEventListener("keydown", function (e) {
        var button=$(".box button");
        try{
            switch (e.keyCode) {
                case 38:
                    myGamePiece.speedY = -0.2;
                    button.eq(0).addClass("press");
                    break;
                case 40:
                    myGamePiece.speedY = 0.2;
                    button.eq(3).addClass("press");
                    break;
                case 37:
                    myGamePiece.speedX = -1;
                    button.eq(1).addClass("press");
                    break;
                case 39:
                    myGamePiece.speedX = 1;
                    button.eq(2).addClass("press");
                    break;
            }
        } catch (e){
            console.log("游戏尚未开始")
        }
    });

    window.addEventListener("keyup", function (e) {
        try{
            switch (e.keyCode) {
                case 38:
                    myGamePiece.speedY = 0.2;
                    break;
                case 40:
                    myGamePiece.speedY = 0.2;
                    break;
                default:
                    myGamePiece.speedX = 0;
            }
            $(".box button").removeClass("press");
        }catch (e){
            console.log("游戏尚未开始")
        }


    });

    document.getElementById("restart").onclick = function () {
        bgm2.stop();
        document.getElementsByClassName("restart")[0].style.display = "none";
        setTimeout(function () {
            myGamePiece.restart();
            myObstacle1.restart();
            myObstacle2.restart();
            obstacles = [];
            myGameArea.clear();
            start();
        }, 1000)
    };

    document.getElementById("start").onclick=function(){
        bgm2.stop();
        this.parentNode.style.display="none";
        start();
    };
    //BGM
    function Sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.loop = "loop";
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        };
        this.stop = function () {
            this.sound.pause();
        };
        this.replay=function(){
            this.sound.currentTime=0;
        }
    }
    window.onload=function(){
        bgm2.play();
        bgm2.sound.volume=0.05;
    };
