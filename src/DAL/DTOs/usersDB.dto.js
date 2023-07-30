
export default class UsersDB_DTO{
    constructor (user){
        this.firstName = user.first_name
        this.lastName = user.last_name
        this.mail = user.email
        this.cart = user.cart
        this.rol = user.role
    }
}