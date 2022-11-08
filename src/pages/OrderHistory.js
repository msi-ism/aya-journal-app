import * as usersService from '../utilities/users-service'

const OrderHistory = () => {
    const handleCheckToken = async () => {
        let expDate = await usersService.checkToken()
        console.log(expDate)
        
    }
    return(
        <div>
            <h1>Order History</h1>
            <input type='button' value='Check When My Login Expires' onClick={handleCheckToken}></input>
        </div>
    )
}

export default OrderHistory