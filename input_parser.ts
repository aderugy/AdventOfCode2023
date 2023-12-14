import * as fs from 'fs';

export function parse(path: string): string[] {
    return fs.readFileSync(path)
        .toString()
        .split('\n')
        .map(line => line.trim());
}