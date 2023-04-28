//Component containing all entry objects as queried from central database. Move to dev.

const EntryList = (props, title) => {
    const entries = props.entries;
    //eventually we will define both the database ENTRIES and the HANDLEDELETE within this method, which will handle te ENTRYLIST for backend interaction with the server! FOR NOW, they are dealt wiht in home.js as following the tutorial. These methods will LIKELY be asynchronuous, atleast insofar as they will need to rely on a promise for the return of the database from watever will be hosting it.
    const handleDelete = props.handleDelete;
    return ( 
        <div className="search-result">
        { entries.map((entry) => (
            <div className="blog-preview" key={entry.id}>
                <h2>{entry.title}</h2>
                <p>writtenby {entry.author}</p>
                <p>id: {entry.id}</p>
                <button onClick={() => handleDelete(entry.id)}>delete entry</button>
            </div>
        ))}   
            
        </div>
     );
}
 
export default EntryList;