async function readInput(inputFile: string): Promise<string> {
    const decoder = new TextDecoder("utf-8");
    const data = await Deno.readFile(inputFile);
    const decodedData = decoder.decode(data);
    return decodedData;
}

function getMulSum(input: string): number {
    const muls = input.match(/mul\([0-9]+,[0-9]+\)/g)
    if (!muls) return 0;
    let sum = 0;
    for (let mul of muls) {
        const numbers = mul.match(/[0-9]+/g);
        if (!numbers[0] || !numbers[1])
            continue
        sum += Number(numbers[0]) * Number(numbers[1]);
        console.log(numbers, sum);
    }
    return sum
}

const input = await readInput("input.txt");
console.log(getMulSum(input));