export interface User {
    user_id : number,
    first_name : string,
    last_name : string,
    email : string,
    phone : string,
    address : string,
    city : string,
    postal_code : number,
    activated : number,
    account_type : number,
    refresh_token : string,
}

export interface AccessTokenUserStructure {
    user_id : number,
    first_name : string,
    last_name : string,
    email : string,
    phone : string,
    address : string,
    city : string,
    postal_code : number,
    activated : number,
    account_type : string,
}

export interface refreshTokenUserStructure {
    user_id : number,
    first_name : string,
    last_name : string,
    email : string,
    phone : string,
    address : string,
    city : string,
    postal_code : number,
    activated : number,
    account_type : string,
    UUID : string,
}