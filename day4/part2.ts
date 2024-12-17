async function readInput(inputFile: string): Promise<string[][]> {
    const decoder = new TextDecoder("utf-8");
    const data = await Deno.readFile(inputFile);
    const decodedData = decoder.decode(data);
    return decodedData.split('\n').map(line => line.split(''));
}


const directions = [{x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}];
function checkForXMas(
    array: string[][],
    currentPos: {x: number, y: number}
): number {
    if (currentPos.x - 1 < 0 || currentPos.x + 1 >= array.length || currentPos.y - 1 < 0 || currentPos.y + 1 >= array[0].length) {
        return 0;
    }
    const str1 = array[currentPos.x - 1][currentPos.y - 1] + array[currentPos.x][currentPos.y] + array[currentPos.x + 1][currentPos.y + 1];
    const str2 = array[currentPos.x - 1][currentPos.y + 1] + array[currentPos.x][currentPos.y] + array[currentPos.x + 1][currentPos.y - 1];

    if (["MAS", "SAM"].includes(str1) && ["MAS", "SAM"].includes(str2)) {
        return 1;
    }
    return 0;
}

const input = await readInput("input.txt");

let nr = 0;
for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
        if (input[x][y] !== "A") {
            continue;
        }
        nr += checkForXMas(input, {x, y});
    }
}

console.log(nr);