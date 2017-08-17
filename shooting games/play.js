<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>打飞机</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        #canvas {
            background-color: #f1f1f1;
            position: relative;
            left: 50%;
            margin-left: -75px;
            margin-top: 50px;
        }

        #score {
            position: relative;
            bottom: 180px;
            left: 50%;
            color: red;
            font-size: 18px;
        }
    </style>
</head>
<body>
<canvas id="canvas" width="150" height="200">
</canvas>
<span id="score"></span>

<script src="play.js"></script>
</body>
</html>
