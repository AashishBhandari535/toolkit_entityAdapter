import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import  { actions, selectors } from "./store";
function App() {
  const [newUserName,setNewUserName] = useState('')
  const dispatch = useDispatch();
  const allUsers = useSelector(selectors.selectAll);
  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=10`)
      .then(res => res.json())
      .then(({results}) => {
        const users = results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          image: user.picture.thumbnail,
        }));
        dispatch(actions.usersAddMany(users));
      } )
  },[])
    const handleFormSubmit = (e) => {
      e.preventDefault();
      dispatch(
        actions.usersAddOne({
          id: String(Math.random()),
          name: newUserName,
          image: "https://placeimg.com/48/48/people",
        })
      );
      setNewUserName("");
    };
  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            style={{ display: "inline" }}
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <input style={{ display: "inline" }} type="submit" value="Create" />
        </form>
        <h1>Users:</h1>
        <div>
          {allUsers.map((user) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <img src={user.image} />
              <input
                style={{ flex: "1", margin: "0 10px" }}
                value={user.name}
                onChange={(e) => {
                  dispatch(
                    actions.userUpdate({
                      id: user.id,
                      changes: { name: e.target.value },
                    })
                  );
                }}
              />
              <button
                style={{ marginBottom: 0 }}
                onClick={() => {
                  dispatch(actions.userRemove(user.id));
                }}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
