export interface FilterParams {
    [param: string]: string | number | boolean | readonly (string | number | boolean)[];
}