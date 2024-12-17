async function readInput(inputFile: string): Promise<string[][]> {
    const decoder = new TextDecoder("utf-8");
    const data = await Deno.readFile(inputFile);
    const decodedData = decoder.decode(data);
    return decodedData.split('\n').map(line => line.split(''));
}


const directions = [{x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}];
function checkForXmas(
    array: string[][],
    currentPos: {x: number, y: number},
    direction: {x: number, y: number}
): number {
    if (currentPos.x + 3*direction.x < 0 || currentPos.x + 3*direction.x >= array.length) {
        return 0;
    }
    if (currentPos.y + 3*direction.y < 0 || currentPos.y + 3*direction.y >= array[0].length) {
        return 0;
    }

    const str = array[currentPos.x][currentPos.y] + 
        array[currentPos.x + direction.x][currentPos.y + direction.y] +
        array[currentPos.x + 2*direction.x][currentPos.y + 2*direction.y] +
        array[currentPos.x + 3*direction.x][currentPos.y + 3*direction.y]

    if (str === "XMAS") {
        return 1;
    }
    return 0;
}

const input = await readInput("input.txt");

let nr = 0;
for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
        if (input[x][y] !== "X") {
            continue;
        }
        for (let direction of directions) {
            nr += checkForXmas(input, {x, y}, direction);
        }
    }
}

console.log(nr);