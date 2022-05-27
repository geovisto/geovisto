/**
 * It rounds number to specified precision
 * @param roundNumber number to be rounded
 * @param roundTo precision
 */

export function roundValues(roundNumber: string | number, roundTo: string | number): number {
    // Convert to number if needed
    if (typeof roundNumber == "string") {
        roundNumber = +roundNumber;
    }
    if (typeof roundTo == "string") {
        roundTo = +roundTo;
    }
    const factor = 10 ** roundTo;
    roundNumber = Math.round(roundNumber * factor) / factor;
    return roundNumber;
}