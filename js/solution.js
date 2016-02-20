(function (root) {
    var EMPTY = root.maze.EMPTY; // 0
    var WALL = root.maze.WALL; // -1
    var PATH = root.maze.PATH; // -2
    var CURRENT = root.maze.CURRENT; // -3

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function solution(maze, x, y) {
        var pathMatrix = arrayClone(maze),
            initialX = x,
            initialY = y,
            isEnd = false,
            path = [];

        function makeWave(matrix, x, y, k) {
            if (isEnd || !checkPointInMatrix(matrix, x, y)) {
                return;
            }
            // проверяем является ли клетка выходом из лабиринта
            if (matrix[y][x] != WALL && y == (matrix.length - 1)) {
                matrix[y][x] = k;
                isEnd = true;

                findPath(matrix, x, y);
                return;
            }

            if (matrix[y][x] == EMPTY) {
                // добавляем вес и идем дальше
                matrix[y][x] = k;

                //идем дальше
                makeWave(matrix, x, y - 1, k + 1);
                makeWave(matrix, x + 1, y, k + 1);
                makeWave(matrix, x, y + 1, k + 1);
                makeWave(matrix, x - 1, y, k + 1);
            }
            return false;

        }

        function findPath(matrix, x, y) {
            // начинаем обратную волну c выхода для нахождения пути
            var i = x, j = y;
            path = [
                [i, j]
            ];

            while (!(i == initialX && j == initialY)) {
                var nextPoint = getPointWighGivenK(matrix, i, j, matrix[j][i] - 1);
                if (nextPoint == null) break;
                i = nextPoint[0];
                j = nextPoint[1];

                path.push([i, j]);
            }
        }

        function getPointWighGivenK(matrix, x, y, targetK) {
            if (checkPointInMatrix(matrix, x, y - 1) && matrix[y - 1][x] == targetK) {
                return [x, y - 1];
            }
            if (checkPointInMatrix(matrix, x + 1, y) && matrix[y][x + 1] == targetK) {
                return [x + 1, y];
            }
            if (checkPointInMatrix(matrix, x, y + 1) && matrix[y + 1][x] == targetK) {
                return [x, y + 1];
            }
            if (checkPointInMatrix(matrix, x - 1, y) && matrix[y][x - 1] == targetK) {
                return [x - 1, y];
            }

            return null;

        }

        function checkPointInMatrix(matrix, x, y) {
            return !(y >= matrix.length || x >= matrix[0].length || x < 0 || y < 0);
        }

        makeWave(pathMatrix, x, y, 1);

        pathMatrix = null;
        return path.reverse();
    }

    function arrayClone( arr ) {
        var i, copy;
        if( Array.isArray( arr ) ) {
            copy = arr.slice( 0 );
            for( i = 0; i < copy.length; i++ ) {
                copy[ i ] = arrayClone( copy[ i ] );
            }
            return copy;
        } else if( typeof arr === 'object' ) {
            throw 'Cannot clone array containing an object!';
        } else {
            return arr;
        }
    }

    root.maze.solution = solution;
})(this);
