export function arrayCopy(src: number[], srcIndex: number, dest: number[], destIndex: number, length: number) {
    for(let i = 0; i < length; i++) {
        dest[destIndex + i] = src[srcIndex + i];
    }
}
