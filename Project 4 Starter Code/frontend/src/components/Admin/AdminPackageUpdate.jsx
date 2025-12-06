import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const AdminPackageUpdate = ()=>{
    const {id} = useParams()
    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const[imgSource,setImgSource]=useState('')
    const[urgent,setUrgent]=useState(null)
    const[active,setActivity] = useState(null)
    const[categoryId,setCategoryId] = useState("")

    useEffect(()=>{
        axios.get(`http://localhost:5000/packages/${id}`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }).then((result)=>{console.log(result.data.result);
      }).catch((err)=>{console.log(err);
      })
    },[])
    return (
        <div>hello world</div>
    )
}
export default AdminPackageUpdate