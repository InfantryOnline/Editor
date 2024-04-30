const CSV_PROP = '__csv__';
const CSV_INDEX = '__csv_index__';
const CSV_ARRAYLENGTH = '__csv_arraylength__';
const CSV_PREDICATE = '__csv_predicate__';

type FieldPredicate<T> = (obj: T) => boolean;

export abstract class CsvFragment {
    parse(row: any): number {
        let columns: number = 0;
        let innerProps: number = 0;
        const meta = (this.constructor as any)[CSV_PROP];

        for (let i = 0; i < row.length; i++) {  
            if (columns >= meta.length) {
                // We've read through all the items  here.
                break;
            }

            let props = meta.filter((p: any) => p[CSV_INDEX] === columns);
            let prop = null;

            if (props.length === 0) {
                throw new Error(`Property not found for index: ${columns}`);
            } else if (props.length > 1) {
                // Two or more properties map to the same index, so we will evaluate their predicates
                // and return the first that returns true.
                prop = props.find((p:any) => p[CSV_PREDICATE](this));
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

                case 'object': // Array, but double check.
                    if (prop[CSV_ARRAYLENGTH] !== undefined) {
                        i--;
                        
                        for (let a =  0; a < prop[CSV_ARRAYLENGTH]; a++) {
                            let aObj =  prop.new() as CsvFragment;
                            let aColumns = aObj.parse(row.slice(i+1));

                            obj[prop.propertyKey].push(aObj);
                            innerProps += aColumns;
                            i += aColumns;
                        }
                        columns++;
                    } else {
                        throw new Error(`Encountered an object but not an array ${t}`);
                    }
                    break;
                default:
                    throw new Error(`Encountered unknown type ${t}`);
            }
        }

        return columns;
    }
}

function create<T>(type: (new () => T) | undefined): T | undefined {
    if (type) {
        return new type();
    }

    return undefined;
}

/**
 * Decorator used to aid in parsing CSV lines/objects. Since the properties of a JavaScript
 * object do not have a definite order, this will help ensure that there is an order.
 */
export function Field<T>(index: number, type: (new() =>T) | undefined = undefined, arraylength: number | undefined = undefined, predicate: FieldPredicate<T> | undefined = undefined) {
    return function (target: Object, propertyKey: string) {
        const meta = target.constructor.hasOwnProperty(CSV_PROP) ?
            (target.constructor as any)[CSV_PROP] :
            (Object.defineProperty(target.constructor, CSV_PROP, {value:[]}) as any)[CSV_PROP];

        meta.push({
            propertyKey: propertyKey,
            [CSV_INDEX]: index,
            [CSV_ARRAYLENGTH]: arraylength,
            [CSV_PREDICATE]: predicate,
            new: () => create(type)
        });
    }
}