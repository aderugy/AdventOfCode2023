import { parse } from '../input_parser';

const input: string[] = parse(__dirname + '\\input');

function part1() {
    let result = 0;
    const digits = "0123456789";

    const indices: {
        x:number,
        y:number,
        endX: number,
        value: number
    }[] = [];

    for (let y = 0; y < input.length; y++) {
        const line = input[y];

        for (let x = 0; x < line.length; x++) {
            let c = line[x];

            if (digits.includes(c))
            {
                let endX = x;
                let number = c;

                while (endX + 1 < line.length && digits.includes(line[endX + 1])) {
                    number += line[endX + 1];
                    endX++;
                }

                indices.push({x, y, endX, value: parseInt(number)})
                x = endX;
            }
        }
    }

    indices.forEach(({x, y, endX, value}) => {
        for (let i = y - 1; i <= y + 1; i++) {
            if (i < 0 || i >= input.length) continue;

            for (let j = x - 1; j <= endX + 1; j++) {
                if (j < 0 || j >= input[i].length) continue;

                const c = input[i][j];
                if (!digits.includes(c) && c !== '.') {
                    result += value;
                    return;
                }
            }
        }
    })

    console.log(result);
}

function part2() {
    let result = 0;
    const digits = "0123456789";

    const indices: {
        x:number,
        y:number,
        endX: number,
        value: number
    }[] = [];

    for (let y = 0; y < input.length; y++) {
        const line = input[y];

        for (let x = 0; x < line.length; x++) {
            let c = line[x];

            if (digits.includes(c))
            {
                let endX = x;
                let number = c;

                while (endX + 1 < line.length && digits.includes(line[endX + 1])) {
                    number += line[endX + 1];
                    endX++;
                }

                indices.push({x, y, endX, value: parseInt(number)})
                x = endX;
            }
        }
    }

    const map: any = {};
    indices.forEach(({x, y, endX, value}) => {
        for (let i = y - 1; i <= y + 1; i++) {
            if (i < 0 || i >= input.length) continue;

            for (let j = x - 1; j <= endX + 1; j++) {
                if (j < 0 || j >= input[i].length) continue;

                const c = input[i][j];
                if (!digits.includes(c) && c === '*') {
                    const hash = i.toString() + '-' + j.toString();
                    if (!map.hasOwnProperty(hash))
                        map[hash] = []
                    map[hash].push(value);
                }
            }
        }
    })

    Object.keys(map).forEach(key => {
        if (map[key].length == 2)
            result += map[key][0] * map[key][1];
    })

    console.log(result);
}

console.log("PART 1");
part1();
console.log("\n-----------------------------\n\nPART 2");
part2();
