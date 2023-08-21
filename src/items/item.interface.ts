export interface BaseItem {
    name : string;
    price : number;
    image : string;
    desc : string;

}

export interface Item extends BaseItem {
    id : number;
}