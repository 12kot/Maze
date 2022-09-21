let lines = prompt("Lines: ", '');
let columns = prompt("Columns: ", '');

let matrix = [["#", "S", "#", "E", ".", "#", "#"],
              ["#", ".", "#", "#", "#", ".", "#"],
              ["#", ".", "#", ".", ".", ".", "#"],
              ["#", ".", ".", ".", ",", "#", "#"],
              ["#", "#", ".", "#", "#", "#", "#"]];

let startPoint = createBoolMatrix(lines, columns, 'S', '#');
let endPoint = createBoolMatrix(lines, columns, 'E', '.');

let queue = [];

alert(searchWay(lines-1, columns-1, startPoint, endPoint) ? "Yes" : "No");

function createBoolMatrix(lines, columns, ind, symbol) {

    for(let i = 0; i < lines; i++) {
        for(let j = 0; j < columns; j++) {

            if(matrix[i][j] != ind) continue; 

            matrix[i][j] = symbol;
            return [i, j];
        
        }
    }

    return;
}

function searchWay(lines, columns, start, end) {
    queue.push(start);

    while(queue.length != 0) {
        let point = queue.shift();
        let i = point[0];
        let j = point[1];

        if(i == end[0] && j == end[1]) return true;
        
        if(checkBorder(0, i-1, i-1, j)) { //граница низ
            setValues(i - 1, j);
        }

        if(checkBorder(+i + 1, lines, +i + 1, j)) { //граница верх
            setValues(+i + 1, j);
        }

        if(checkBorder(0, j - 1, i, j - 1)) { //граница лево
            setValues(i, j - 1);
        }

        if(checkBorder(+j + 1, columns, i, +j + 1)) { //граница право
            setValues(i, +j + 1);
        }
    }

    return false;
}

function checkBorder(index, number, i, j) {
    if(index <= number) 
        if(matrix[i][j] == '.') return true;

    return false;
}

function setValues(i, j) {
    queue.push([i, j]);
    matrix[i][j] = '#';
}