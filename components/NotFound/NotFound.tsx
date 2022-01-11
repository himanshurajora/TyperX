import { Link } from "react-router-dom"

export default function NotFound() {

    return (
        <>
            <div className="hero is-large">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            404
                        </h1>
                        <h2 className="subtitle">
                            Page Not Found
                        </h2>
                        <Link className="button is-dark" to={"/"}>Go To Home</Link>
                    </div>
                </div>
            </div>
        </>
    )
}