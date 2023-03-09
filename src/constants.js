// urls pages
export const HOME_PAGE = "/"
export const SIGN_UP_PAGE = "/signup"
export const TODOS_PAGE = "/todos"
export const NOT_FOUND = "*"
export const BASE_URL = "http://localhost:4000"

// token name
export const TOKEN_NAME = "TOKEN_NAME"

// regex of user name
export const RGX_NAME = /^[a-zA-z]{4,8}$/
export const RGX_NAME_TODOS = /^[a-zA-z ]{4,100}$/
export const RGX_TODO_ID = /^[a-zA-z0-9-]{36,60}$/

// message from invalid name
export const INVALID_NAME = "invalid name,please enter the valid name"
export const REQUEST_FAILED = "error occured please try again"
export const USER_ALREADY_EXISTS = "user already exists,please take another"
export const INVALID_TODO_NAME = "invalid todo name(max:100,min:4)"

// redux action
export const GET_ALL_TODOS = "GET_ALL_TODOS"
export const ADD_TODO = "ADD_TODO"
export const REMOVE_TODO = "REMOVE_TODO"
export const UPDATE_TODO = "UPDATE_TODO"
