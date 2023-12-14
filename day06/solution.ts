import { parse } from '../input_parser';

const input: string[] = parse(__dirname + '\\input');

const regex = /[^0-9]/g ;
function part1() {
    const times = input[0]
        .split(regex)
        .filter(n => n.length > 0)
        .map(n => parseInt(n));

    const distances = input[1]
        .split(regex)
        .filter(n => n.length > 0)
        .map(n => parseInt(n));

    const results = [];
    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const distance = distances[i];

        let start = 1;
        while (start * (time - start) <= distance)
            start++;

        results.push(time - 2 * start + 1);
    }

    console.log(results.reduce((a, b) => a * b));
}

function part2() {
    const time = parseInt(input[0].replaceAll(regex, ''));
    const distance = parseInt(input[1].replaceAll(regex, ''));

    let start = 1;

    while (start * (time - start) <= distance)
        start++;

    console.log(time - 2 * start + 1);
}

console.log("PART 1");
part1();
console.log("\n-----------------------------\n\nPART 2");
part2();
