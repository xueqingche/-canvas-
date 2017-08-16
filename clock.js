<script>
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
function draw(){
    ctx.clearRect(0,0,200,200);

    var pi = Math.PI;
    ctx.fillStyle = "skyblue";

    ctx.beginPath();
    ctx.strokeStyle="blue";
    ctx.lineWidth=1;
    ctx.arc(100, 100, 80, 0, 2 * pi);
    ctx.fill();
    ctx.stroke();



    ctx.translate(100, 100);

    ctx.beginPath();
    ctx.fillStyle="yellow";
    ctx.arc(0,0,5,0,2*pi);
    ctx.fill();

    function setnumber() {
        ctx.fillStyle="red";
        var deg = pi / 6;
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (var i = 1; i < 13; i++) {
            ctx.rotate(deg);
            ctx.translate(0, -70);

        //绘制刻度线
            ctx.beginPath();
            ctx.strokeStyle="black";
            ctx.moveTo(0,-5);
            ctx.lineTo(0,-10);
            ctx.stroke();


        //绘制数字
            ctx.rotate(-deg);
            ctx.fillText(i, 0, 0);
            ctx.rotate(deg);
            ctx.translate(0, 70);
            ctx.rotate(-deg);
            deg += pi / 6;
        }
    }

    setnumber();
    //绘制指针的函数
    function sethand(ctx, long, deg, width,color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.lineWidth = width;
        ctx.moveTo(0, 0);
        ctx.rotate(deg);
        ctx.lineTo(0, -long);
        ctx.stroke();
        ctx.rotate(-deg);
    }
    //得到时间  并获取每个指针转的角度
    function time() {
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        var hourdeg = hour * pi / 6 + minute * pi / (6 * 60) + second * pi / (6 * 3600);
        var minutedeg = minute * pi / 30 + second * pi / (30 * 60);
        var seconddeg = second * pi / 30;
        sethand(ctx, 40, hourdeg, 5,"black");
        sethand(ctx, 55, minutedeg, 3,"blue");
        sethand(ctx, 62, seconddeg, 1.5,"red");
    }
    time();

    //绘制秒针刻度
    var deg1=pi/30;
    for(var i=1;i<61;i++){
        ctx.rotate(deg1);
        ctx.translate(0, -70);
        ctx.beginPath();
        ctx.strokeStyle="black";
        ctx.moveTo(0,-7);
        ctx.lineTo(0,-10);
        ctx.stroke();
        ctx.translate(0, 70);
        ctx.rotate(-deg1);
        deg1+=pi/30;
    }
    ctx.translate(-100, -100);
}
draw();
setInterval(draw,1000);



</script>