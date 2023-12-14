import { parse } from '../input_parser';

const input: string[] = parse(__dirname + '\\input');

function part1() {

}

function part2() {
    const seeds: number[] = input[0]
        .split(': ')[1]
        .split(' ')
        .map(n => parseInt(n));

    const mappings: number[][][] = [];

    let layer = 0;
    let i = 3;
    while (i < input.length)
    {
        mappings.push([]);

        while (i < input.length && input[i].length > 1)
        {
            mappings[layer].push(
                input[i]
                    .split(' ')
                    .map(n => parseInt(n))
            );
            i++;
        }

        layer++;
        i += 2;
    }

    const results: number[][] = [];
    for (i = 0; i + 1 < seeds.length; i += 2)
    {
        let base: number[][] = [[seeds[i], seeds[i] + seeds[i + 1]]];

        for (let j= 0; j < mappings.length; j++) {
            let next: number[][] = [];

            while (base.length > 0)
            {
                // @ts-ignore
                const [start, end] = base.shift();
                let found = false;

                for (let k = 0; k < mappings[j].length; k++) {
                    const [dst, src, len] = mappings[j][k];

                    let r1 = start;
                    let r2 = end;

                    if (start < src && end < src || start > src + len)
                        continue;

                    found = true;
                    if (src > start)
                        r1 = src;
                    if (src + len < end)
                        r2 = src + len;

                    next.push([r1 - src + dst, r2 - src + dst]);

                    if (r1 !== start)
                        base.push([start, r1 - 1]);
                    if (r2 !== end)
                        base.push([r2 + 1, end]);
                }

                if (!found)
                    next.push([start, end]);
            }

            base = [...next];
            next = [];
        }
        results.push(...base);
    }

    console.log(results.map(o => o[0]).sort((a, b) => a - b)[0]);
}

console.log("PART 1");
part1();
console.log("\n-----------------------------\n\nPART 2");
part2();
