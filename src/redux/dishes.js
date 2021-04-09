import * as ActionTypes from './ActionTypes';

export const Dishes = (state = 
    {
        isLoading: true,
        errMes: null,
        dishes:[]
    }, action) => 
{
    switch (action.type)
    {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMes: null, dishes: action.payload};
        
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMes: null, dishes: []};
        
        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMes: action.payload};
            
        default:
            return state;
    }
}