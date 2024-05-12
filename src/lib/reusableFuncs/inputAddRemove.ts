export default class InputArray {
    inputs: { value: string }[];

    constructor() {
        this.inputs = [{ value: "" }, { value: "" }];
    }

    inputAdder() {
        this.inputs = [...this.inputs, { value: "" }];
    }

    inputRemover(index: number) {
        this.inputs = this.inputs.filter((_, i) => i !== index);
    }

    inputReset() {
        this.inputs = [{ value: "" }, { value: "" }];
    }
}
