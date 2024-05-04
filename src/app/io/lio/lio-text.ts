import { CsvFragment, Field } from "../csv/field";

export class LioText extends CsvFragment {
    @Field(0)
    color: number = 0;

    @Field(1)
    frequency: number = 0;

    @Field(2)
    text: string = "";
}
