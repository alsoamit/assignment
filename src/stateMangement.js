import { createStore } from "redux";

// Root Reducer
function rootReducer(state = null, action) {
    state = {
        published: [],
        drafts: [],
    };
    let history = localStorage.getItem("state");
    if (history) {
        state = JSON.parse(history);
        console.log(history);
    }

    if (action.type === "publish") {
        return {
            ...state,
            published: [...state.published, action.payload],
        };
    } else if (action.type === "draft") {
        return {
            ...state,
            drafts: [...state.drafts, action.payload],
        };
    } else if (action.type === "deletePost") {
        return {
            ...state,
            published: state.published.filter(
                (post) => post.id !== action.payload.id
            ),
        };
    } else if (action.type === "deleteDraft") {
        return {
            ...state,
            drafts: state.drafts.filter((draft) => draft.id !== action.payload.id),
        };
    }
    // localStorage.setItem("state", JSON.stringify(state));
    return state;
}

// Create and export the Store
export const store = createStore(rootReducer);