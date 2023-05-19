import { useNavigate } from "react-router-dom";
import { useState, useRef } from 'react'
import axios from 'axios';

function Search() {
  const navigate = useNavigate();
  const search = useRef();

  const [query, setQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("")
  const findUser = async (user) => {
    
    try {

      const request = await axios.get(`https://api.github.com/users/${user}`);
      navigate(`/github-finder/user/${request.data.login}`);
      return true;
    } catch(error) {

      setErrorMsg("We can't find that user. Try again.");
    }
  }

  const handleSubmit=() => {

    findUser(query);
  }

  return (
    <section className="searchpage">
      <h1>Github Finder</h1>
      <form 
        onSubmit={(e)=>{
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          name="search"
          type="text"
          autoComplete="off"
          onChange={ (e) => {
            setErrorMsg("");
            setQuery(e.target.value);}}
          ref={search}
        />
        <input
          type="submit"
          value="Search"
          disabled = { query!=="" ? false : true }
        />
      </form>
      <h2 className="error-message">{errorMsg}</h2>
    </section>
  )
}

export default Search