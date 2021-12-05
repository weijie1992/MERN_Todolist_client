export const initialState = [];

export default function todoReducer(
  state = { loading: false, todos: [] },
  action
) {
  switch (action.type) {
    case "DELETE_TASK":
      console.log("In Reducer DELETE_TASK");
      return {
        ...state,
        loading: false,
        todos: action.payload.todos,
        email: action.payload.email,
        _id: action.payload._id,
      };
    case "COMPLETE_TASK":
      console.log("In Reducer COMPLETE_TASK");
      return {
        ...state,
        loading: false,
        todos: action.payload.todos,
        email: action.payload.email,
        _id: action.payload._id,
      };

    case "ADD_NEW_TASK":
      console.log("In Reducer ADD_NEW_TASK");
      return { ...state, loading: false, todos: action.payload.todos };
    case "LOGIN":
      console.log("In Reducer LOGIN");
      return {
        ...state,
        loading: false,
        todos: action.payload.todos,
        email: action.payload.email,
        _id: action.payload._id,
      };
    case "CALL_API":
      console.log("In Reducer CALL_API");
      return { ...state, loading: true };
    case "FINISH_API":
      console.log("In Reducer FINISH_API");
      return { ...state, loading: false };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {...state, loading:false}
  }
}
