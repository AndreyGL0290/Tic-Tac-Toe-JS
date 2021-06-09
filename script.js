let figure = "крестик";
let win_strike = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let context;
let canvas;
let gap;

// Корректируем размеры холста
correction();

// Функция отрисовки
function draw(number){
    canvas = document.getElementById(number);
    context = canvas.getContext("2d");
    context.beginPath();
    context.lineWidth = 5;
    // Рисует крестик
    if (figure == "крестик" &&
        !check('X')&&
        !check('O')&&
        // Если эта клеточка уже занята, то мы не сможем ее использовать
        win_strike.indexOf(number) != -1){
        context.strokeStyle = '#ec4646';
        if (canvas.height == canvas.width){
            context.moveTo(10, 10)
            context.lineTo(canvas.width-10, canvas.height-10);
            context.moveTo(canvas.width-10, 10);
            context.lineTo(10, canvas.height-10);
        }
        else if (canvas.width > canvas.height){
            gap = (canvas.width - canvas.height) / 2;
            context.moveTo(gap+10, 10)
            context.lineTo(canvas.width-gap-10, canvas.height-10);
            context.moveTo(canvas.width-gap-10, 10);
            context.lineTo(gap+10, canvas.height-10);
        }
        else{
            gap = (canvas.height - canvas.width) / 2 ;
            context.moveTo(10, gap+10)
            context.lineTo(canvas.width-10, canvas.height-gap-10);
            context.moveTo(10, canvas.height-gap-10);
            context.lineTo(canvas.width-10, gap+10);
        }
        figure = "нолик";
        win_strike[win_strike.indexOf(number)] = 'X';
        if (check("X")){
            document.getElementById('win').textContent = "Player №1 wins";
            document.getElementById('restart').textContent = "Restart";
        }else{
            standoff();
        }
    }
    // Рисуте нолик
    else if (figure == "нолик" &&
              !check('X')&&
              !check('O')&&
              // Если эта клеточка уже занята, то мы не сможем ее использовать
              win_strike.indexOf(number) != -1){
        context.strokeStyle = '#51c2d5';
        if (canvas.height >= canvas.width){
            context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, 2 * Math.PI);
        }else{
            context.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 10, 0, 2 * Math.PI);
        }
        figure = "крестик";
        win_strike[win_strike.indexOf(number)] = 'O';
        if (check("O")){
            document.getElementById('win').textContent = "Player №2 wins";
            document.getElementById('restart').textContent = "Restart";
        }
        else{
            standoff();
        }
    }
    context.stroke();
}

// Функция, отвечающая за победу того или иного игрока
function check(symbol){
    for (let i = 0; i<7; i += 3){
        if (win_strike[i] == symbol && win_strike[i + 1] == symbol && win_strike[i + 2] == symbol){
            return true;
        }
    }

    for (let i = 0; i<3; i++){
        if (win_strike[i] == symbol && win_strike[i + 3] == symbol && win_strike[i + 6] == symbol){
            return true;
        }
    }

    for (let i = 0; i<3; i += 3){
        if (win_strike[i] == symbol && win_strike[i + 4] == symbol && win_strike[i + 8] == symbol){
            return true;
        }
    }

    for (let i = 0; i<3; i += 3){
        if (win_strike[i + 2] == symbol && win_strike[i + 4] == symbol && win_strike[i + 6] == symbol){
            return true;
        }
    }
}

// Функция, отвечающая за переигровку
function restart(){
    for (let i = 1; i<10; i++){
        canvas = document.getElementById(i);
        context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    document.getElementById('restart').textContent = '';
    document.getElementById('win').textContent = '';
    figure = 'крестик';
    win_strike = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

// Функция, отвечающая за корректирование размеров холста
function correction(){
    for (let i = 1; i<10; i++){
        canvas = document.getElementById(i);
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
}

// Функция, отвечающая за определение ничьи 
function standoff(){
    for (let i = 1; i<10; i++){
        if (win_strike.indexOf(i) != -1){
            return;
        }
    }
    document.getElementById('win').textContent = "Draw";
    document.getElementById('restart').textContent = "Restart";
}
