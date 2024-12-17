async function readInput(inputFile: string): number[][] {
    const decoder = new TextDecoder("utf-8");
    const data = await Deno.readFile(inputFile);
    const decodedData = decoder.decode(data);
    return decodedData.split("\n").map(val => 
        val.split(" ").map(val => Number(val))
    );
}

function checkSafety(report: number[]): boolean {
    const sortOrder = report[0] < report[1] ? 1 : -1;
    for (let i = 0; i < report.length-1; i++) {
        const diff = (report[i+1] - report[i]) * sortOrder;
        if (diff <= 0 || diff > 3) {
            return false;
        }
    }

    return true;
}

function checkSafetyOneError(report: number[]): boolean {
    if (checkSafety(report)) {
        return true;
    }
    for (let i = 0; i < report.length; i++) {
        if (checkSafety(report.toSpliced(i, 1))) {
            return true;
        }
    }

    return false;
}

const reports = await readInput("input.txt");
let safeReports = 0;
for (let i = 0; i < reports.length; i++) {
    const safe = checkSafetyOneError(reports[i]);
    if (safe) {
        safeReports++;
    }
}

console.log(safeReports);
