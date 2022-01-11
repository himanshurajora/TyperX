import { useState } from "react";
import { Link } from "react-router-dom";


export default function Home() {
    const [path, setPath] = useState("Basic");
    return (
        <>
            <div className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            TyperX
                        </h1>
                        <h2 className="subtitle">
                            Learn By Typing
                        </h2>
                        <p className="title is-3">
                            Choose Your Path
                        </p>
                        <div className="select is-primary is-rounded is-large">
                        <select defaultValue={"Basic"} onChange={(e)=>{setPath(e.target.value)}}>
                            {/* Basic */}
                            <option value="Basic">Basic</option>
                            {/* Data Structures */}
                            {/* <option value="DataStructures">Data Structures</option> */}
                            {/* Algorithms */}
                            {/* <option value="Algorithms">Algorithms</option> */}
                        </select>
                        </div>
                        <br />
                        <br />
                        <Link to={"/practice/" + path} className="button is-primary is-rounded">Jump In</Link><hr />
                    <div className="subtitle is-6"> <span className="has-text-danger">*</span>Due To Some Issues Data Structures and Algorithms can not be Launched Yet</div>
                    </div>
                </div>
            </div>

        </>
    )
}