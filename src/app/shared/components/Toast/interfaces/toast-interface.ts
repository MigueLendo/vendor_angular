export interface toastInterface {

    id: string | number,
    message: string,
    visible: boolean,
    type: 'danger' | 'success' | 'info',
    timer: number

}   