import { unAuthRequest } from "./requestMethod"

export const loginCall = async (userCredentail, dispatch) => {
    dispatch({ type: "LOGIN_START" })

    try {
        const res = await unAuthRequest.post("/users/login", userCredentail)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error })
    }
}