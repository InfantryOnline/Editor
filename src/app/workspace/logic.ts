/**
 * Lexical tokens.
 */
export enum TokenKind {
    BLeft,
    BRight,
    And,
    Or,
    Not,
    Attribute,
    Skill,
    Cash,
    Experience,
    ClassId
}

/**
 * Scanned token.
 */
export interface Part {
    kind: TokenKind;
    id?: number;
    qty?: number;
}

/**
 * Parses a logic string and returns the constituents. Note that the parser does not have any
 * idea of what the IDs map over to - this is left up to the caller to deal with as to how it
 * wishes to display it.
 */
export class LogicParser {
    static parse(str: string): Part[] {
        let parts: Part[] = [];

        

        return parts;
    }
}