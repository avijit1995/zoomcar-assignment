import { GET_DATA_SUCCESS, GET_DATA_FAIL } from "./action-types";

export const getCitiesListSuccess = (payloadData) => ({
    type: GET_DATA_SUCCESS,
    data: payloadData,
});

export const getCitiesListFail = (error) => ({
    type: GET_DATA_FAIL,
    data: [],
});
