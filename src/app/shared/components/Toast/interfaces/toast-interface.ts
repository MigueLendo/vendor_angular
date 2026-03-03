export interface IToastInterface {

    id: number,
    message: string,
    visible: boolean,
    type: 'danger' | 'success' | 'info',
    timer: number

}   