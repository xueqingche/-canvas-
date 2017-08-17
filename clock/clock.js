var canvas =  document。getElementById（“ canvas ”）;
var ctx =  画布。getContext（“ 2d ”）;
function  draw（）{
    ctx。clearRect（0，0，200，200）;

    var pi =  Math。PI ;
    ctx。fillStyle  =  “ skyblue ” ;

    ctx。beginPath（）;
    ctx。strokeStyle = “ blue ” ;
    ctx。lineWidth = 1 ;
    ctx。弧（100，100，80，0，2  * PI）;
    ctx。fill（）;
    ctx。stroke（）;



    ctx。翻译（100，100）;

    ctx。beginPath（）;
    ctx。fillStyle = “ yellow ” ;
    ctx。弧（0，0，5，0，2 * PI）;
    ctx。fill（）;

    function  setnumber（）{
        ctx。fillStyle = “ red ” ;
        var deg = pi /  6 ;
        ctx。font  =  “ bold 14px Arial ” ;
        ctx。textAlign  =  “ center ” ;
        ctx。textBaseline  =  “ middle ” ;
        for（var i =  1 ; i <  13 ; i ++）{
            ctx。旋转（deg）;
            ctx。翻译（0，- 70）;

        //绘制刻度线
            ctx。beginPath（）;
            ctx。strokeStyle = “ black ” ;
            ctx。的moveTo（0，- 5）;
            ctx。lineTo（0，- 10）;
            ctx。stroke（）;


        //绘制数字
            ctx。旋转（- deg）;
            ctx。fillText方法（I，0，0）;
            ctx。旋转（deg）;
            ctx。翻译（0，70）;
            ctx。旋转（- deg）;
            deg + = pi /  6 ;
        }
    }

    setnumber（）;
    //绘制指针的函数
    函数 sethand（ctx，long，deg，width，color）{
        ctx。beginPath（）;
        ctx。strokeStyle  = color;
        ctx。lineCap  =  “ round ” ;
        ctx。lineWidth  = width;
        ctx。的moveTo（0，0）;
        ctx。旋转（deg）;
        ctx。lineTo（0，- long）;
        ctx。stroke（）;
        ctx。旋转（- deg）;
    }
    //得到时间并获取每个指针转的角度
    function  time（）{
        var now =  new  Date（）;
        VAR小时=  现在。getHours（）;
        var minute =  now。getMinutes（）;
        VAR第二=  现在。getSeconds（）;
        var hourdeg = hour * pi /  6  + minute * pi /（6  *  60）+ second * pi /（6  *  3600）;
        var minutedeg = minute * pi /  30  + second * pi /（30  *  60）;
        var seconddeg = second * pi /  30 ;
        sethand（ctx，40，hourdeg，5，“ black ”）;
        sethand（ctx，55，minutedeg，3，“ blue ”）;
        sethand（ctx，62，seconddeg，1.5，“ red ”）;
    }
    time（）;

    //绘制秒针刻度
    var deg1 = pi / 30 ;
    for（var i = 1 ; i < 61 ; i ++）{
        ctx。旋转（deg1）;
        ctx。翻译（0，- 70）;
        ctx。beginPath（）;
        ctx。strokeStyle = “ black ” ;
        ctx。moveTo（0，- 7）;
        ctx。lineTo（0，- 10）;
        ctx。stroke（）;
        ctx。翻译（0，70）;
        ctx。旋转（- deg1）;
        deg1 + = pi / 30 ;
    }
    ctx。翻译（- 100，- 100）;
}
draw（）;
setInterval（draw，1000）;
