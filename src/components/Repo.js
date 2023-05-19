import React from 'react'

function Repo({
  name, 
  description,
  date,
  link,
}) {
  return (
    <li>
      <div className="repository">
        <div className="repoleft">
          <h4 onClick={() => {window.open(link, "_blank")}}>{name}</h4>
          <p className={description ? "" : "weaktext"}>{description ? description : "No description written."}</p>
        </div>
        <div className="reporight">
          <p className="weaktext">{date}</p>
        </div>
      </div>
    </li>
  )
}

export default Repo