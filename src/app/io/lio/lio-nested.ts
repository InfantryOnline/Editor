import { CsvFragment, Field } from "../csv/field";

export class LioNested extends CsvFragment {
    @Field(0)
    nestedLioFileName: string = "";
}
