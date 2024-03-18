import { Nav, Spinner, Tab } from "react-bootstrap";
import useFetch from "../../CustomHooks/useFetch"
import { getUserOrders, getUserProfile } from "../../Services/user.service";
import InfoBox from "./InfoBox";
import ProfileImageBox from "./ProfileImageBox"
import OrderTable from "../CartAndOrder/OrderTable";
import AddressBox from "./AddressBox";
import PaginationProvider from "../../ContextProvider/PaginationProvider";



export default function ProfilePage() {

    return (
        <div className="my-5">
            < Tab.Container defaultActiveKey="profile" mountOnEnter >
                <div className="row">
                    <div className="col-3">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="profile">Profile Dasboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="order">My Orders</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="col-9">
                        <Tab.Content>
                            <Tab.Pane eventKey="profile">
                                <ProfileTab />
                            </Tab.Pane>
                            <Tab.Pane eventKey="order">
                                <PaginationProvider>
                                    <OrderTab />
                                </PaginationProvider>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </div>
            </ Tab.Container >
        </div>
    );
}


const ProfileTab = () => {

    const { data: user, isLoading } = useFetch(getUserProfile);

    return (
        <>
            {
                isLoading ? (
                    <div className="w-100 text-center my-5">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <>
                        <h1>Profile</h1>
                        <hr />
                        <div className="col-4 offset-4">
                            <ProfileImageBox
                                img={user.imgUrl}
                            />
                        </div >
                        <div>
                            <InfoBox user={user} />
                        </div>
                        <div className="my-5">
                            <h1>Address</h1>
                            <hr />
                            <AddressBox
                                addresses={user.addresses}
                                userId={user.id}
                            />
                        </div>
                    </>

                )}
        </>
    );
}

const OrderTab = () => {

    const { data: orders, isLoading } = useFetch(getUserOrders);

    return (
        <>
            {
                isLoading ? (
                    <div className="w-100 text-center my-5" >
                        <Spinner animation="border" />
                    </div >
                ) : (
                    <OrderTable orders={orders} />
                )
            }
        </>

    );
}
