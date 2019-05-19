import { GET_GALLERY_LIST } from './../actions/gallery-actions'
import AppState from './../App-State/AppState'

const initialState: AppState = {
    galleryData: []
}

export default function getGalleryListReducer(state: AppState = initialState, action: any): AppState {
    switch (action.type) {
        case GET_GALLERY_LIST:
            return {
                ...state,
                galleryData: state.galleryData.concat(...action.payload.galleryData),
            }
        default:
            return state
    }
}