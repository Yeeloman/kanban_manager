export default class InputArray {
    inputs: { value: string }[];

    constructor(initial_val: {value: string }[] = [{ value: "" }, { value: "" }]) {
        this.inputs = initial_val;
    }

    inputAdder() {
        this.inputs = [...this.inputs, { value: "" }];
    }

    inputRemover(index: number) {
        this.inputs = this.inputs.filter((_, i) => i !== index);
    }
}
