import { parse } from '../input_parser';

const input: string[] = parse(__dirname + '\\input').map(line => line.trim());

function part1() {
    let startX = -1;
    let startY = -1;

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] === 'S')
            {
                startX = x;
                startY = y;

                break;
            }

            if (startX !== -1)
                break;
        }
    }

    const costs = input.map(line =>
        line.trim()
            .split('')
            .map(() => -1)
    );
    costs[startY][startX] = 0;

    const NORTH = 0;
    const SOUTH = 1;
    const WEST = 2;
    const EAST = 3;

    const queue  = [[startX, startY, NORTH]];
    while (queue.length > 0)
    {
        //@ts-ignore
        const [x, y, from] = queue.shift();
        const c = input[y][x];
        const cost = costs[y][x];

        function isValidSuccessor(x: number, y: number) {
            return y >= 0 && y < input.length &&
                x >= 0 && x <= input[y].length &&
                input[y][x] !== '.' && costs[y][x] === -1;
        }

        let nextX = x;
        let nextY = y;
        let nextDir = NORTH;
        switch (c) {
            case '|':
                if (from === NORTH)
                    nextY = y + 1;
                else if (from === SOUTH)
                    nextY = y - 1;
                else
                {
                    costs[y][x] = -1;
                    continue;
                }

                nextDir = from;
                break;
            case '-':
                if (from === WEST)
                    nextX = x + 1;
                else if (from === EAST)
                    nextX = x - 1;
                else
                {
                    costs[y][x] = -1;
                    continue;
                }

                nextDir = from;
                break;
            case 'L':
                if (from === NORTH)
                {
                    nextX = x + 1;
                    nextDir = WEST;
                }
                else if (from === EAST)
                {
                    nextY = y - 1;
                    nextDir = SOUTH;
                }
                else
                {
                    costs[y][x] = -1;
                    continue;
                }

                break;
            case 'J':
                if (from === NORTH)
                {
                    nextX = x - 1;
                    nextDir = EAST;
                }
                else if (from === WEST)
                {
                    nextY = y - 1;
                    nextDir = SOUTH;
                }
                else
                {
                    costs[y][x] = -1;
                    continue;
                }

                break;

            case '7':
                if (from === SOUTH)
                {
                    nextX = x - 1;
                    nextDir = EAST;
                }
                else if (from === WEST)
                {
                    nextY = y + 1;
                    nextDir = NORTH;
                }
                else
                {
                    costs[y][x] = -1;
                    continue;
                }

                break;

            case 'F':
                if (from === SOUTH)
                {
                    nextX = x + 1;
                    nextDir = WEST;
                }
                else if (from === EAST)
                {
                    nextY = y + 1;
                    nextDir = NORTH;
                }
                else
                {
                    costs[y][x] = -1;
                    continue;
                }

                break;

            case '.':
                continue;

            default:
                if (isValidSuccessor(x + 1, y))
                {
                    costs[y][x + 1] = cost + 1;
                    queue.push([x + 1, y, WEST]);
                }
                if (isValidSuccessor(x, y + 1))
                {
                    costs[y + 1][x] = cost + 1;
                    queue.push([x, y + 1, NORTH]);
                }
                if (isValidSuccessor(x - 1, y))
                {
                    costs[y][x - 1] = cost + 1;
                    queue.push([x - 1, y, EAST]);
                }
                if (isValidSuccessor(x, y - 1))
                {
                    costs[y - 1][x] = cost + 1;
                    queue.push([x, y - 1, SOUTH]);
                }
                continue;
        }

        if (isValidSuccessor(nextX, nextY))
        {
            costs[nextY][nextX] = cost + 1;
            queue.push([nextX, nextY, nextDir]);
        }
    }

    console.log(Math.max(...costs.map(line => Math.max(...line))));
}

function part2() {
    let startX = -1;
    let startY = -1;

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] === 'S')
            {
                startX = x;
                startY = y;

                break;
            }

            if (startX !== -1)
                break;
        }
    }

    const map: any = {};
    function getKey(x: number, y: number) {
        return x + '-' + y;
    }
    function getValue(x: number, y: number) {
        return map[getKey(x, y)];
    }

    const NORTH = 0;
    const SOUTH = 1;
    const WEST = 2;
    const EAST = 3;

    function findPath(x: number, y: number, from: number): boolean
    {
        const c = input[y][x];

        if (x === startX && y === startY && from !== -1)
            return true;

        function isValidSuccessor(x: number, y: number) {
            return (y >= 0 && y < input.length &&
                x >= 0 && x <= input[y].length &&
                input[y][x] !== '.' && !getValue(x, y)) ||
                (x === startX && y === startY);
        }

        let nextX = x;
        let nextY = y;
        let nextDir = NORTH;
        switch (c) {
            case '|':
                if (from === NORTH)
                    nextY = y + 1;
                else if (from === SOUTH)
                    nextY = y - 1;
                else
                    return false;

                nextDir = from;
                break;
            case '-':
                if (from === WEST)
                    nextX = x + 1;
                else if (from === EAST)
                    nextX = x - 1;
                else
                    return false;

                nextDir = from;
                break;
            case 'L':
                if (from === NORTH)
                {
                    nextX = x + 1;
                    nextDir = WEST;
                }
                else if (from === EAST)
                {
                    nextY = y - 1;
                    nextDir = SOUTH;
                }
                else
                    return false;

                break;
            case 'J':
                if (from === NORTH)
                {
                    nextX = x - 1;
                    nextDir = EAST;
                }
                else if (from === WEST)
                {
                    nextY = y - 1;
                    nextDir = SOUTH;
                }
                else
                    return false;

                break;

            case '7':
                if (from === SOUTH)
                {
                    nextX = x - 1;
                    nextDir = EAST;
                }
                else if (from === WEST)
                {
                    nextY = y + 1;
                    nextDir = NORTH;
                }
                else
                    return false;

                break;

            case 'F':
                if (from === SOUTH)
                {
                    nextX = x + 1;
                    nextDir = WEST;
                }
                else if (from === EAST)
                {
                    nextY = y + 1;
                    nextDir = NORTH;
                }
                else
                    return false;

                break;

            case '.':
                return false;

            default:
                if (isValidSuccessor(x + 1, y) && findPath(x + 1, y, WEST))
                {
                    map[getKey(x, y)] = [x + 1, y];
                    return true;
                }
                if (isValidSuccessor(x, y + 1) && findPath(x, y + 1, NORTH))
                {
                    map[getKey(x, y)] = [x, y + 1];
                    return true;
                }
                if (isValidSuccessor(x - 1, y) && findPath(x - 1, y, EAST))
                {
                    map[getKey(x, y)] = [x - 1, y];
                    return true;
                }
                if (isValidSuccessor(x, y - 1) && findPath(x, y - 1, SOUTH))
                {
                    map[getKey(x, y)] = [x, y - 1];
                    return true;
                }
                return false;
        }

        if (isValidSuccessor(nextX, nextY) && findPath(nextX, nextY, nextDir))
        {
            map[getKey(x, y)] = [nextX, nextY];
            return true;
        }

        return false;
    }

    if (!findPath(startX, startY, -1))
        throw new Error('Path not found.');

    const wallMap: boolean[][] = [];
    for (let y = 0; y < input.length; y++) {
        let line = [];
        for (let x = 0; x < input[0].length; x++) {
                line.push(map.hasOwnProperty(getKey(x, y)));
        }
        wallMap.push(line);
    }

    // @ts-ignore
    wallMap.forEach(line => console.log(line.map(b => b ? 'X' : '.').reduce((prev: string, next: string) => prev + next)));
}

console.log("PART 1");
part1();
console.log("\n-----------------------------\n\nPART 2");
part2();
