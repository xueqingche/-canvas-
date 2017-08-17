let airs = [], air, bullets = [], bullet, obstacles = [], obstacle, obj = [];
    let game = {
        canvas: document.getElementById("canvas"),
        ctx: canvas.getContext("2d"),
        flag: 0,
        //子弹发射间隔时间
        obs: 0,
        launch: false,
        score: 0,
        update: function () {
            game.ctx.clearRect(0, 0, 150, 200);
            game.flag++;
            for (let i = 0; i < airs.length; i++) {
                if (game.ctx.dir == "left") {
                    airs[i].x -= 5;
                }
                if (game.ctx.dir == "right") {
                    airs[i].x += 5;
                }
                airs[i].draw()
            }
            game.ctx.dir = null;
            //发射子弹
            if ((game.flag >= 4) && game.launch) {
                bullet = new Create(airs[0].x, airs[0].y, 10, 10);
                bullets.push(bullet);
                bullet.color = "lime";
                game.flag = 0;
            }
            game.launch = false;

            //生成障碍物
            let timer = Math.floor(Math.random() * 20 + 20);
            if (game.obs >= timer) {
                let x = Math.floor(Math.random() * 110 + 20);
                obstacle = new Create(x, 10, 10, 10);
                obstacles.push(obstacle);
                obstacle = new Create(x, 0, 10, 10);
                obstacles.push(obstacle);
                obstacle = new Create(x + 10, 0, 10, 10);
                obstacles.push(obstacle);
                obstacle = new Create(x - 10, 0, 10, 10);
                obstacles.push(obstacle);
                obj.push(obstacles);
                obstacles = [];
                game.obs = 0;
            }
            //移除多余的障碍物
            if (obj.length >= 10) {
                obj.shift();
            }
            //检测碰撞
            for (let i = 0; i < obj.length; i++) {
                for (let j = 0; j < obj[i].length; j++) {
                    for (let m = 0; m < bullets.length; m++) {
                        if (bullets[m].crashWith(obj[i][j])) {
                            game.score++;
                            bullets.splice(m, 1);
                            obj.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            //移除多余的子弹
            if (bullets.length > 10) {
                bullets.shift();
            }
            //绘制子弹
            for (let j = 0; j < bullets.length; j++) {
                bullets[j].y -= 6;
                bullets[j].draw();
            }
            //绘制障碍物
            for (let i = 0; i < obj.length; i++) {
                for (let j = 0; j < obj[i].length; j++) {
                    obj[i][j].color = "yellow";
                    obj[i][j].y += 2;
                    obj[i][j].draw();
                }
            }
            game.obs++;                                      //子弹间隔时间
            document.getElementById("score").innerHTML = "SCORE:" + game.score;
        },
        start: function () {
            game.ctx.clearRect(0, 0, 150, 200);
            air = new Create(75, 190, 10, 10);
            airs.push(air);
            air = new Create(75, 180, 10, 10);
            airs.push(air);
            air = new Create(85, 190, 10, 10);
            airs.push(air);
            air = new Create(65, 190, 10, 10);
            airs.push(air);
            setInterval(game.update, 50)
        }
    };


    //绘制元素
    function Create(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.xspeed = 0;
        this.total_speed = 0;
        this.width = width;
        this.height = height;
        this.color = "red";
        this.draw = function () {
            game.ctx.fillStyle = this.color;
            game.ctx.fillRect(this.x, this.y, this.width, this.height)
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

    game.start();

    window.addEventListener("keydown", function (e) {
        if (e.keyCode == 38) {
            game.launch = true
        }
        switch (e.keyCode) {
            case 37:
                game.ctx.dir = "left";
                break;
            case 39:
                game.ctx.dir = "right";
                break;
        }
    });
