import { parse } from '../input_parser';

const input: string[] = parse(__dirname + '\\input');

function part1() {
    const max_set = {
        red: 12,
        green: 13,
        blue: 14
    }

    let result = 0;
    input.forEach((line, index) => {
        const sets = line
            .split(': ')[1]
            .split(/; ?/);

        const colorValuePairs: any[] = sets.map(set => {
            const colorValuePair: any = {
                red: 0,
                green: 0,
                blue: 0
            }

            set.split(', ')
                .forEach(pair => {
                    const [value, color] = pair.split(' ');
                    colorValuePair[color] += parseInt(value);
                });

            return colorValuePair;
        })

        function isValid(pair: any) {
            return  pair.red <= max_set.red &&
                    pair.green <= max_set.green &&
                    pair.blue <= max_set.blue;
        }

        for (let i = 0; i < colorValuePairs.length; i++)
        {
            if (!isValid(colorValuePairs[i]))
                return;
        }

        result += index + 1;
    })

    console.log(result);
}

function part2() {
    let result = 0;
    input.forEach(line => {
        const sets = line
            .split(': ')[1]
            .split(/; ?/);

        const colorValuePairs: any[] = sets.map(set => {
            const colorValuePair: any = {
                red: 0,
                green: 0,
                blue: 0
            }

            set.split(', ')
                .forEach(pair => {
                    const [value, color] = pair.split(' ');
                    colorValuePair[color] += parseInt(value);
                });

            return colorValuePair;
        })

        const minRed = Math.max(...(colorValuePairs.map(pair => pair.red)));
        const minGreen = Math.max(...(colorValuePairs.map(pair => pair.green)));
        const minBlue = Math.max(...(colorValuePairs.map(pair => pair.blue)));

        result += minRed * minGreen * minBlue;
    })

    console.log(result);
}

console.log("PART 1");
part1();
console.log("\n-----------------------------\n\nPART 2");
part2();
