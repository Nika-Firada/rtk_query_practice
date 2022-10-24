import React from 'react';
import { useContactsQuery, useContactQuery, useAddContactMutation, useUpdateContactMutation, useDeleteContactMutation } from './services/contactsApi';


function App() {
  const {data,error,isLoading,isFetching,isSuccess} = useContactsQuery();
  return (
    <div className="App">
      <h1>React Redux Toolkit RTK Query</h1>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>...Something went wrong</h2>}
      {isSuccess && (
        <div>
          {data?.map(contact => {
            return <div className="data" key={contact.id}>
              <span>{contact.name}</span>
              <span><ContactDetail id={ contact.id} /></span>
            </div>
          })}
        </div>
      )}
      <div>
        <AddContact />
      </div>
    </div>
  );
}

export const ContactDetail = ({ id }:{id:string}) => {
  const { data } = useContactQuery(id);
  return (
    <pre>{ JSON.stringify(data, undefined, 2)}</pre>
  )
}
export const AddContact = () =>{
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const contact = {"id":"4", "name":"Davit Wiqara44", "email":"DavitF@example.com"}
  const contactUp = {"id":"4", "name":"999999999999", "email":"DavitF@example.com"}
  const addHandler = async() =>{
    await addContact(contact)
  }
  const updateHandler = async() =>{
    await updateContact(contactUp)
  }
  const deleteHandler = async() =>{
    await deleteContact(contact.id)
  }
  return (
    <>
      <button onClick={addHandler}>Add Contact</button>
      <button onClick={updateHandler}>update Contact</button>
      <button onClick={deleteHandler}>delete Contact</button>
    </>
  )
  
}

export default App;
