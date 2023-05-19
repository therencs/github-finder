import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import Repo from '../components/Repo.js';

function User() {
  const { username } = useParams();

  const [details, setDetails] = useState({});
  const [repositories, setRepositories] = useState([]);

  const getData = useCallback(async () => {

    const userData = await axios.get(`https://api.github.com/users/${username}`);
    const repoData = await axios.get (`https://api.github.com/users/${username}/repos`);

    setDetails(userData.data);
    setRepositories(repoData.data)

  }, [username])

  const formatDate = (date) => {
    let dateObject = new Date(date);
    let dateOptions = {
      day: "numeric",
      year: "numeric",
      month: "short",
    }
    return dateObject.toLocaleDateString("en-US", dateOptions);
  }

  useEffect(() => {
    getData();

  }, [getData])

  return (
    <>
      <div className="user-container">
        <div className="userbox"><img src={details.avatar_url} alt=""/></div>
          <h1>{details.login}</h1>
          <ul>
            {[
              {name : "repositories", value: details.public_repos},
              {name: "followers", value: details.followers},
              {name: "following", value: details.following}
            ]
            .map(currentdetail => 
              <li key={crypto.randomUUID()}>
                <h3>{currentdetail.value}</h3>
                <p>{currentdetail.name}</p>
              </li>
            )}
          </ul>
        <button onClick={() => {
          window.open(`https://github.com/${username}`, "_blank");
        }}>GO TO GITHUB</button>
      </div>
      <section className="repos">
        <h3 id={(details.public_repos>0) ? "" : "norepos"} >{(details.public_repos > 0) ? "My repositories" : "No public repositories available"}</h3>
        <ul>
          {repositories.map(repo => 
            <Repo 
              name={repo.name}
              description={repo.description}
              date={
                repo.updated_at ? (`Updated on ${formatDate(repo.updated_at)}`) : (`Created on ${formatDate(repo.created_at)}`)
              }
              link={repo.html_url}
              key={crypto.randomUUID()}
            />)
          }
        </ul>
      </section>
    </>
  )
}

export default User