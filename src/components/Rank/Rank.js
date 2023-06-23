import React from "react";

const Rank = ({name, entries}) =>{
    return(
        <div>
            <div className="f2">
                {`${name}, your current entries number is `}
            </div>
            <div className="f1">
                {`${entries}`}
            </div>
        </div>
    )
}

export default Rank;