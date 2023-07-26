
function enclose(grid) {
	let maze = [];
    for (let i = 0; i < grid.length; i++) {
		maze.push(grid[i][0]);
		maze.push(grid[i][49]);
    }
    for (let i = 1; i < 49; i++) {
		maze.push(grid[0][i]);
		maze.push(grid[29][i]);
    }
	return maze;
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min)) + min;
}

export function randomMaze(grid) {
	let maze = [];
    for(let i = 0; i < 30; i++) {
        for(let j = 0; j < 50; j++) {
            let x = randomInt(1, 4);
            if(x === 1) 
				maze.push(grid[i][j]);
        }
    }
    return maze;
}

export function randomWeightMaze(grid) {
	let maze = [];
    for(let i = 0; i < 30; i++) {
        for(let j = 0; j < 50; j++) {
            let x = randomInt(1, 4);
            if(x === 1)
                maze.push(grid[i][j]);
        }
    }
    return maze;
}

export function recursiveDivision(grid) {
	let maze = enclose(grid)
    function subRecursiveDivision(x_min, y_min, x_max, y_max){
        if (y_max - y_min > x_max - x_min)
		{
			let x = randomInt(x_min + 1, x_max);
			let y = randomInt(y_min + 2, y_max - 1);

			if ((x - x_min) % 2 === 0)
				x += (randomInt(0, 2) === 0 ? 1 : -1);

			if ((y - y_min) % 2 === 1)
				y += (randomInt(0, 2) === 0 ? 1 : -1);

			for (let i = x_min + 1; i < x_max; i++)
				if (i !== x)
				{
					maze.push(grid[i][y]);
				}

			if (y - y_min > 2)
				subRecursiveDivision(x_min, y_min, x_max, y);

			if (y_max - y > 2)
				subRecursiveDivision(x_min, y, x_max, y_max);
		}

		else
		{
			let x = randomInt(x_min + 2, x_max - 1);
			let y = randomInt(y_min + 1, y_max);

			if ((x - x_min) % 2 === 1)
				x += (randomInt(0, 2) === 0 ? 1 : -1);

			if ((y - y_min) % 2 === 0)
				y += (randomInt(0, 2) === 0 ? 1 : -1);

			for (let i = y_min + 1; i < y_max; i++)
				if (i !== y)
				{
					maze.push(grid[x][i]);
				}

			if (x - x_min > 2)
				subRecursiveDivision(x_min, y_min, x, y_max);

			if (x_max - x > 2)
				subRecursiveDivision(x, y_min, x_max, y_max);
		}
	}

	subRecursiveDivision(0, 0, 29, 49);
    return maze;
}