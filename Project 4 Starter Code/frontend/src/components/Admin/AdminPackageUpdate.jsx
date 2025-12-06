import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminPackageUpdate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSource, setImgSource] = useState("");
  const [urgent, setUrgent] = useState(null);
  const [active, setActivity] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((result) => setCategories(result.data.result))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/packages/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setTitle(result.data.result.title);
        setDescription(result.data.result.description);
        setImgSource(result.data.result.imgSource);
        setUrgent(result.data.result.urgent);
        setActivity(result.data.result.Active);
        setCategoryId(result.data.result._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>Updating Package Info</h1>
      <img src={imgSource} />
      <br />
      Title
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      Description{" "}
      <input
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      Image Source{" "}
      <input
        type="text"
        value={imgSource}
        onChange={(e) => {
          setImgSource(e.target.value);
        }}
      />
      <br />
      Is It Urgent ?{" "}
      <select>
        <option value={urgent}></option>
        <option
          value={urgent}
          onChange={(e) => {
            setUrgent(true);
          }}
        >
          Yes
        </option>
        <option
          value={urgent}
          onChange={(e) => {
            setUrgent(false);
          }}
        >
          No
        </option>
      </select>
      <br />
      Field Type{" "}
      <select onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Choose here</option>
        {categories.map((cat, i) => (
          <option key={cat._id} value={cat._id}>
            {cat.title}
          </option>
        ))}
      </select><br/>
      Activity Status
      <select
        onChange={(e) => {
          setActivity(e.target.value);
        }}
      >
        <option value={""}></option>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <br />
      <button>Update</button>
    </div>
  );
};
export default AdminPackageUpdate;
