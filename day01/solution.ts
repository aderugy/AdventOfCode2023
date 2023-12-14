import { parse } from '../input_parser';

const input: string[] = parse(__dirname + '\\input');

function part1() {
    const digits = "0123456789";
    let result = 0;

    input.forEach(line => {
        for (let i = 0; i < input.length; i++)
        {
            if (digits.includes(line[i])) {
                result += parseInt(line[i]) * 10;
                break;
            }
        }

        for (let i = input.length - 1; i >= 0; i--)
        {
            if (digits.includes(line[i])) {
                result += parseInt(line[i]);
                break;
            }
        }
    })

    console.log(result);
}

function part2() {
    const digits = "0123456789";
    const strDigits = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine"
    ]

    let result = 0;
    input.forEach(line => {
        let first = null;
        let last = null;

        for (let i = 0; i < line.length; i++)
        {
            const sliced = line.slice(i);
            if (digits.includes(line[i])) {
                const value = parseInt(line[i]);

                if (first == null)
                    first = value;
                last = value;
            }

            for (let j = 0; j < strDigits.length; j++)
            {
                if (sliced.startsWith(strDigits[j]))
                {
                    if (first == null)
                        first = j;
                    last = j;
                }
            }
        }

        if (first == null || last == null)
            throw new Error("first or last null. Str: " + line);

        result += 10 * first + last;
    })

    console.log(result);
}

console.log("PART 1");
part1();
console.log("\n-----------------------------\n\nPART 2");
part2();
