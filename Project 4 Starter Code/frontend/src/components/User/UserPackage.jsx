import { useState } from "react"
import { useParams } from "react-router-dom"

const UserPackage = ()=>{
    const {id} = useParams()
    const [thisPackage,setThisPackage] = useState([])
    
    return (
        <div>hello world</div>
    )

}
export default UserPackage