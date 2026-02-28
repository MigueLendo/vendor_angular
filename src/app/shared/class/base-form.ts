import { signal, WritableSignal } from "@angular/core"

import { FieldTree, form, FormOptions, SchemaOrSchemaFn } from "@angular/forms/signals"


export class BaseForm<MODEL> {

    model!: WritableSignal<MODEL>;
    formdata!: FieldTree<MODEL>;

    createform(model: MODEL, schemapatch: SchemaOrSchemaFn<MODEL> | FormOptions) {
        this.model = signal(model)
        this.formdata = form(this.model, schemapatch)
    }

    onSave() {
        throw new Error("Method Not Save")
    }

    onCancel() {
        throw new Error("Method Not Cancel")
    }

    get isDisabled(): boolean {
        return this.formdata().invalid()
    }

}