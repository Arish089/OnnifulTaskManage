import React from 'react'
import { ADD_DESCRIPTION, ADD_TITLE, ASSIGNEE, END_DATE, PRIORITY, RESET, START_DATE, STATUS } from './actionTypes';

export const initialState = {
    title: "",
    description: "",
    start_Date: "",
    end_Date: "",
    status: "",
    assignee: "",
    priority: ""
}

const reducer = (state=initialState,{type,payload}) => {
  switch (type) {
    case ADD_TITLE:
        return{
            ...state,
            title: payload
        }

        case ADD_DESCRIPTION:
        return{
            ...state,
            description: payload
        }
        
        case START_DATE:
        return{
            ...state,
            start_Date: payload
        }

        case END_DATE:
        return{
            ...state,
            end_Date: payload
        }
        
        case ASSIGNEE:
            return{
                ...state,
                assignee: payload
            }

        case STATUS:
        return{
            ...state,
            status: payload
        }

        case PRIORITY:
        return{
            ...state,
            priority: payload
        }

        case RESET:
            return initialState
  
    default:
        return state
  }
}

export default reducer