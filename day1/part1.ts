

function calculateDistance(arr1: number[], arr2: number[]): number {
    arr1 = arr1.sort();
    arr2 = arr2.sort();
    let distance = 0;
    for (let i = 0; i<arr1.length; i++) {
        distance += Math.abs(arr1[i] - arr2[i]);
    }

    return distance;
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
const distance = await calculateDistance(arr1, arr2);
console.log(distance)

// const arr1 = [3, 4, 2, 1, 3, 3];
// const arr2 = [4, 3, 5, 3, 9, 3];

// console.log(calculateDistance(arr1, arr2));