let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

ctx.textAlign = "center";

let w = canvas.width;
let h = canvas.height;


let l = w / 3;
let p = 10;

let playing = true;
let turn = 1;

let grid = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];


function draw() {
    ctx.clearRect(0, 0, w, h);
    //draw grid
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(l, 0);
    ctx.lineTo(l, h);
    ctx.moveTo(2 * l, 0);
    ctx.lineTo(2 * l, h);
    ctx.moveTo(0, l);
    ctx.lineTo(w, l);
    ctx.moveTo(0, 2 * l);
    ctx.lineTo(w, 2 * l);
    ctx.stroke();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = j * l;
            let y = i * l;

            // ctx.font = "10px monospace";
            // ctx.fillText(i + "," + j, x + l / 2, y + 30);

            if (grid[i][j] == 0) {
                ctx.beginPath();
                ctx.arc(x + l / 2, y + l / 2, l / 2 - p, 0, 2 * Math.PI);
                ctx.stroke();
            } else if (grid[i][j] == 1) {
                ctx.beginPath();
                ctx.moveTo(x + p, y + p);
                ctx.lineTo(x + l - p, y + l - p);
                ctx.moveTo(x + l - p, y + p);
                ctx.lineTo(x + p, y + l - p);
                ctx.stroke();
            }
        }
    }

    check();
}
draw();

function update(i, j) {
    if (playing) {
        if (grid[i][j] == -1) {
            grid[i][j] = turn;
            turn = Math.abs(turn - 1);
        } else {
            console.log("already played");
        }
    }

    draw();
}

function stringToMoves(str) {
    let moves = str.match(/(..?)/g);
    for (let k = 0; k < moves.length; k++) {
        let i = moves[k][0];
        let j = moves[k][1];

        update(i, j);
    }
}

function check() {
    let winner = -1;
    for (let i = 0; i < 3; i++) {
        if (grid[i].every((val, j, arr) => val === arr[0]) && grid[i][0] != -1) {
            winner = grid[i][0];

            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.moveTo(0, i * l + l / 2);
            ctx.lineTo(w, i * l + l / 2);
            ctx.stroke();
            ctx.strokeStyle = "black";
        }

    }
    for (let j = 0; j < 3; j++) {
        if (grid[0][j] == grid[1][j] && grid[0][j] == grid[2][j] && grid[0][j] != -1) {
            winner = grid[0][j];

            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.moveTo(j * l + l / 2, 0);
            ctx.lineTo(j * l + l / 2, w);
            ctx.stroke();
            ctx.strokeStyle = "black";
        }
    }
    if (grid[0][0] == grid[1][1] && grid[0][0] == grid[2][2] && grid[0][0] != -1) {
        winner = grid[0][0];

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(w, w);
        ctx.stroke();
        ctx.strokeStyle = "black";
    }

    if (grid[2][0] == grid[1][1] && grid[2][0] == grid[0][2] && grid[2][0] != -1) {
        winner = grid[2][0];

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(w, 0);
        ctx.lineTo(0, w);
        ctx.stroke();
        ctx.strokeStyle = "black";
    }


    if (!grid[0].some(val => val == -1) && !grid[1].some(val => val == -1) && !grid[2].some(val => val == -1) && winner == -1) {
        winner = 2;
    }

    if (winner != -1) {
        if (winner == 2) {
            ctx.fillStyle = "rgba(255,255,255,0.8)"
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "70px monospace";
            ctx.fillText("TIE", w / 2, h / 2);
        } else {
            let W;
            if (winner == 0) {
                W = "O";
            } else if (winner == 1) {
                W = "X";
            }

            // ctx.fillStyle = "rgba(255,255,255,0.8)"
            // ctx.fillRect(0, 0, w, h);
            // ctx.fillStyle = "black";
            // ctx.textAlign = "center";
            // ctx.font = "70px monospace";
            // ctx.fillText(W + " won!", w / 2, h / 2);
        }

        playing = false;
    }
}

function restart() {
    playing = true;
    turn = 1;
    grid = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];

    draw();
}

canvas.addEventListener("click", (e) => {
    let x = e.clientX;
    let y = e.clientY;
    let i, j;

    if (x > 0 && x < l) {
        j = 0;
    } else if (x > l && x < 2 * l) {
        j = 1;
    } else if (x > 2 * l && x < w) {
        j = 2;
    }

    if (y > 0 && y < l) {
        i = 0;
    } else if (y > l && y < 2 * l) {
        i = 1;
    } else if (y > 2 * l && y < h) {
        i = 2;
    }

    update(i, j);
});

document.addEventListener("keypress", (e) => {
    if (e.key == ' ') {
        restart();
    }
});