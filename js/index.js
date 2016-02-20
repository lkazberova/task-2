(function (root) {
    function drawMaze() {
        var mazeName = document.querySelector('.controls__filter').value;
        var map = root.maze[mazeName];
        var path = root.maze.solution(map, 1, 0);

        while( document.querySelector('.outer').firstChild ) {
            document.querySelector('.outer').removeChild( document.querySelector('.outer').firstChild );
        }
        document.querySelector('.outer').appendChild(
            root.maze.render(map, path)
        );
    }

    document.querySelector('.controls__filter').addEventListener("change", function (){
        drawMaze()
    });

    drawMaze();
})(this);
