import {create} from "zustand";
const UseConversations = create ((set)=>({
    SelectedConversation :null,
    SetSelectedConversation :(SelectedConversation)=>set({SelectedConversation}),
    Messages : [],
    SetMessages : (Messages)=>set({Messages})
}))

export default UseConversations;