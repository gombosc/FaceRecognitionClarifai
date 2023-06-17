import React from "react";

const Rank = ({name, entries}) =>{
    return(
        <div>
            <div className="f2">
                {`${name}, you're current entries rank is `}
            </div>
            <div className="f1">
                {`${entries}`}
            </div>
        </div>
    )
}

export default Rank;