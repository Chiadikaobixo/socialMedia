import axios from "axios";


const API = "https://chiadi-socialmedia-api.herokuapp.com"
let token = ''

if (localStorage.getItem("user")) {
    token = JSON.parse(localStorage.getItem("user"))?.data.token
} else {
    token = ''
}

export const userRequest = axios.create({
    baseURL: API,
    headers: { "Authorization": `Bearer ${token}` }
})

export const unAuthRequest = axios.create({
    baseURL: API
})