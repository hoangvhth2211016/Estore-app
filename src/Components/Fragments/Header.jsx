import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import useCart from "../../CustomHooks/useCart";
import useAuth from "../../CustomHooks/useAuth";


export default function Header() {

    const { cart } = useCart();

    const { auth, handleLogout } = useAuth();

    let numberOfItems = cart ? Object.keys(cart.products).length : 0;

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>ESTORE</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 d-flex align-items-center justify-content-between w-100"
                        style={{ maxHeight: '130px' }}
                        navbarScroll
                    >
                        <div className="d-flex align-items-center">
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                            <Nav.Link as={Link} to='/products'>Products</Nav.Link>
                        </div>
                        <div className="d-flex align-items-center">
                            {!auth.accessToken ? (
                                <>
                                    <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                                    <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link className="btn btn-link" as={Link} to={'/user/cart'}>
                                        <div className=" position-relative ">
                                            <i className="bi bi-cart3 fs-5"></i>
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {numberOfItems === 0 ? '' : numberOfItems}
                                            </span>
                                        </div>
                                    </Nav.Link>
                                    <Nav.Link as={Link} to={'/user'}>
                                        <i className="bi bi-person-fill fs-5"></i>
                                    </Nav.Link>
                                    <Nav.Link onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right fs-5"></i>
                                    </Nav.Link>
                                </>
                            )
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container >
        </Navbar >
    )
}
