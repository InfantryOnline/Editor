const CSV_PROP = '__csv__';
const CSV_INDEX = '__csv_index__';
const CSV_ARRAYLENGTH = '__csv_arraylength__';
const CSV_PREDICATE = '__csv_predicate__';

/**
 * Used to satisfy the criteria for a particular field for a given CSV Index; usually you use this if you have different properties
 * mapped to the same index across different versions of the file. The args array returns nearest->furthest ancestor object.
 */
export type FieldPredicate<T> = (obj: T, ...args: any[]) => boolean;

/**
 * Decorator used to aid in parsing CSV lines/objects. Since the properties of a JavaScript
 * object do not have a definite order, this will help ensure that there is an order.
 * 
 * @param index 
 * @returns 
 */
export function Field(index: number) {
    return function (target: Object, propertyKey: string) {
        const meta = getOrCreateCsvProp(target);

        let entry = meta.find((m:any) => m.propertyKey === propertyKey);

        if (entry) {
            entry[CSV_INDEX] = index;
        } else {
            meta.push({
                propertyKey: propertyKey,
                [CSV_INDEX]: index
            });
        }
    }
}

/**
 * Added decorator, treat the field as an array field with a given length.
 * 
 * @param type 
 * @param length 
 * @returns 
 */
export function ArrayField<T>(type : (new() => T), length: number) {
    return function (target: Object, propertyKey: string) {
        const meta = getOrCreateCsvProp(target);

        let entry = meta.find((m:any) => m.propertyKey === propertyKey);

        if (entry) {
            entry[CSV_ARRAYLENGTH] = length;
            entry.create = () => create<T>(type);
        } else {
            meta.push({
                propertyKey: propertyKey,
                [CSV_ARRAYLENGTH]: length,
                create: () => create<T>(type)
            });
        }
    }
}

/**
 * Added decorator, treat the field as a predicate such that if two or more of the same
 * column index are found, the field whose predicate first evaluates to true will be
 * used for the parsing operation.
 * 
 * @param predicate
 * @returns 
 */
export function FieldPredicate<T>(predicate: FieldPredicate<T>) {
    return function (target: Object, propertyKey: string) {
        const meta = getOrCreateCsvProp(target);

        let entry = meta.find((m:any) => m.propertyKey === propertyKey);

        if (entry) {
            entry[CSV_PREDICATE] = predicate;
        } else {
            meta.push({
                propertyKey: propertyKey,
                [CSV_PREDICATE]: predicate
            });
        }
    }
}

export abstract class CsvFragment {
    parse(row: any, ...args: any[]): number {
        let columns: number = 0;
        let innerProps: number = 0;
        const meta = (this.constructor as any)[CSV_PROP];
        const newArgs = (args && structuredClone(args) || []).unshift(this);

        for (let i = 0; i < row.length; i++) {  
            if (columns >= meta.length) {
                // We've read through all the items  here.
                break;
            }

            let props = meta.filter((p: any) => p[CSV_INDEX] === columns);
            let prop = null;

            if (props.length === 0) {
                console.log(`Warning: CSV Property not found for column: ${columns}`);
                columns++;
                continue;
            } else if (props.length > 1) {
                // Two or more properties map to the same index, so we will evaluate their predicates
                // and return the first that returns true.
                prop = props.find((p:any) => p[CSV_PREDICATE](this, args));

                if (!prop) {
                    throw new Error('Unable to satisfy predicate for CSV branching.');
                }
            }

            prop = prop || props[0];

            let obj = <any>this;
            let t = typeof obj[prop.propertyKey];

            switch(t) {
                case 'number':
                    obj[prop.propertyKey] = parseInt(row[i], 10);
                    columns++;
                    break;

                case 'boolean':
                    obj[prop.propertyKey] = row[i] === '1';
                    columns++;
                    break;
                
                case 'string':
                    obj[prop.propertyKey] = row[i];
                    columns++;
                    break;

                case 'object':
                    if (prop[CSV_ARRAYLENGTH] !== undefined) {
                        i--;

                        for (let a =  0; a < prop[CSV_ARRAYLENGTH]; a++) {
                            let aObj =  prop.create() as CsvFragment;
                            let aColumns = aObj.parse(row.slice(i+1), newArgs);

                            obj[prop.propertyKey].push(aObj);
                            innerProps += aColumns;
                            i += aColumns;
                        }
                        columns++;
                    } else {
                        throw new Error(`Encountered an object but not an array ${t}. Sub-objects are not implemented yet.`);
                    }
                    break;
                default:
                    throw new Error(`Encountered unknown type ${t}`);
            }
        }

        return columns;
    }
}

// Helpers

function create<T>(type: (new () => T)): T {
    return new type();
}

function getOrCreateCsvProp(target: Object) {
    const meta = target.constructor.hasOwnProperty(CSV_PROP) ?
        (target.constructor as any)[CSV_PROP] :
        (Object.defineProperty(target.constructor, CSV_PROP, {value:[]}) as any)[CSV_PROP];

    return meta;
}
