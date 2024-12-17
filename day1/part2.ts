

function calculateSimilarity(arr1: number[], arr2: number[]): number {
    const map = new Map<number, number>();
    let similarityScore = 0;

    for (let i = 0; i < arr2.length; i++) {
        let nrOfEntries = map.get(arr2[i]);
        if (!nrOfEntries) {
            nrOfEntries = 1;
        } else {
            nrOfEntries++;
        }
        map.set(arr2[i], nrOfEntries);
    }

    for (let i = 0; i < arr1.length; i++) {
        const nrOfEntries = map.get(arr1[i]);
        similarityScore += (nrOfEntries || 0) * arr1[i];
    }

    return similarityScore;
}

async function readInput() {
    const decoder = new TextDecoder("utf-8");
    const data = await Deno.readFile("input.txt");
    const decoded = decoder.decode(data);
    const arr1: number[] = [], arr2: number[] = [];
    decoded.split('\n').forEach(val => {
        const split = val.split("   ");
        arr1.push(Number(split[0]));
        arr2.push(Number(split[1]));
    })
    // console.log(decoder.decode(data));
    return {arr1, arr2}
}

const {arr1, arr2} = await readInput();
const similarityScore = await calculateSimilarity(arr1, arr2);
console.log(similarityScore);