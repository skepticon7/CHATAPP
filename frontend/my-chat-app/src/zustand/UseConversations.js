import {create} from "zustand";
 const UseConversations = create  ((set)=>({
    SelectedConversation :null,
    SetSelectedConversation :(SelectedConversation)=>set({SelectedConversation}),
    Messages : [],
    SetMessages : (Messages)=>set({Messages}),
    ProfilePicture : null,
    SetPP : (ProfilePicture)=>set({ProfilePicture}),
    conversation: [], 
    setConversation : (conversation)=>set({conversation}),
    searched :null,
    setSearched : (searched)=>set({searched}),
    invites : [],
    setInvites : (invites)=>set({invites}),
}))

export default UseConversations;