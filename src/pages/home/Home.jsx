import SideBar from "../../components/sideBar/SideBar"
import TopBar from "../../components/topBar/TopBar"
import Feed from "../../components/feed/Feed"
import './home.css'
import RightBar from "../../components/rightBar/RightBar"

const Home = () => {
    return (
        <div>
            <TopBar />
            <div className="homeContainer">
                <SideBar />
                <Feed />
                <RightBar />
            </div>
        </div>
    )
}

export default Home