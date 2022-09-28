let lines = prompt("Lines: ", '');
let columns = prompt("Columns: ", '');

let matrix = [["#", "S", "#", "#", "#"],
              ["#", ".", "#", ".", "E"],
              ["#", ".", "#", ".", "#"],
              ["#", ".", ".", ".", "#"],
              ["#", "#", "#", "#", "#"]];

let startPoint = readPoint(lines, columns, 'S', '#');
let endPoint = readPoint(lines, columns, 'E', '.');

let queue = [];

alert(searchWay(lines - 1, columns - 1, startPoint, endPoint) ? "Yes" : "No");
console.log(matrix);
alert(outWay(matrix, endPoint));

function readPoint(lines, columns, ind, symbol) {

    for(let i = 0; i < lines; i++) {
        for(let j = 0; j < columns; j++) {

            if(matrix[i][j] !== ind) continue;

            matrix[i][j] = symbol;
            return [i, j];
        
        }
    }
}

function searchWay(lines, columns, start, end) {
    queue.push(start);

    while(queue.length !== 0) {
        let point = queue.shift();
        let i = point[0];
        let j = point[1];

        if(i === end[0] && j === end[1]) return true;

        if (checkPoint(0, i - 1, i - 1, j)) { //поинт низ
            setValues(i - 1, j, 'D');
        }

        if(checkPoint(+i + 1, lines, +i + 1, j)) { //поинт верх
            setValues(+i + 1, j, 'U');
        }

        if(checkPoint(0, j - 1, i, j - 1)) { //поинт лево
            setValues(i, j - 1, 'R');
        }

        if(checkPoint(+j + 1, columns, i, +j + 1)) { //поинт право
            setValues(i, +j + 1, 'L');
        }
    }

    return false;
}

function checkPoint(index, number, i, j) {
    if(index <= number) 
        if(matrix[i][j] === '.') return true;

    return false;
}

function setValues(i, j, code) {
    queue.push([i, j]);
    matrix[i][j] = code;
}

function outWay(matrix, endPoint) {
    let way = [];

    let i = endPoint[0],
        j = endPoint[1];
    
    while (matrix[i][j] !== '#') {

        if (matrix[i][j] === 'U') {
            way.push(' d');
            i--; continue;}

        if (matrix[i][j] === 'D') {
            way.push(' u');
            i++; continue;}
        
        if (matrix[i][j] === 'R') {
            way.push(' l');
            j++; continue;
        }
        
        if (matrix[i][j] === 'L') {
            way.push(' r');
            j--;  continue;
        }
    }
    return way.reverse();
}