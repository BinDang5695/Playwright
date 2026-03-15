export interface ComputerDataType {

    loginCreds?: { username: string, password: string },
    computerCompType: string,
    processor: string,
    ram: string,
    hdd: string,
    software: string,
    os?: string,
    quantity?: number,

}