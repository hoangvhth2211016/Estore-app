import { Link } from "react-router-dom"


export default function Footer() {
    return (
        <footer className="bg-light mt-auto">
            <div className="container text-center my-5">
                <Link to="/" className="text-decoration-none"><h1 className="text-body">ESTORE</h1></Link>
                <hr />
                <div>
                    <p>Copyright By Huy Hoang Vu</p>
                </div>
            </div>
        </footer>
    )
}
