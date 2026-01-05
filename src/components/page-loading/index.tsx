import {HashLoader} from "react-spinners";

const PageLoading = () => {
    return (
        <div className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center z-10`}>
            <HashLoader color="#ffffff" size={60}/>
        </div>
    )
}
export default PageLoading;