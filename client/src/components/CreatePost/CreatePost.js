import { useState } from "react"
import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { createOnePost } from "../../store/thunk/posts"
import FileBase from "react-file-base64"
import Input from "./Input"
import "./styles.css"


const initialState = {title: "Title", sections: [], tags: [], image: ""}
const CreatePost = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [formData, setFormData] = useState(initialState)
    const [sectionText, setSectionText] = useState("") 

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSectionText = (e) => {
        setSectionText(e.target.value)
    }

    const handleTags = (e) => {
        setFormData({...formData, tags: e.target.value.split(",")})
    }

    const addSection = () => {
        const foundSection = formData.sections.find(section => section === sectionText)
        if(foundSection === sectionText){
            alert("Section with same content")
        }else{
            setFormData({...formData, sections: formData.sections.concat([sectionText])})
        }
        setSectionText("")
    }

    const deleteSection = (e) => {
        setFormData({...formData, sections: formData.sections.filter((section) => section !== e.target.firstChild.data)})
    }

    const handleSubmit  = (e) => {
        e.preventDefault()
        if(user?.isAdmin === 2){
            dispatch(createOnePost(formData))
            setFormData(initialState)
        }else{
            navigate("/auth")
        }
    }

    return(
        <div className="createPostPage">
            <form className="createPostMenu" onSubmit={handleSubmit}>
                <Input name="title" label="Title" required handleChange={handleChange} value={formData.title}/>
                <h1 className="roboto blueText centered">{formData.title}</h1>
                {
                    formData.sections.map(sectionText => 
                        ( 
                            <p className="roboto paragraph" key={sectionText} onClick={deleteSection}>{sectionText}</p>
                        )
                    )
                }
                <Input name="sections" label="Section Text" handleChange={handleSectionText} value={sectionText}/>
                <Button variant="contained" color="primary" onClick={addSection}>Add section</Button>
                <div className="date roboto blueText">{new Date().toDateString()}</div>
                <ul className="tags roboto">{formData.tags.map((tag) => <li className="tag" key={tag}>#{tag}</li>)}</ul>
                <Input name="tags" label="Tags" handleChange={handleTags} />
                <div className="fileInput">
                    <FileBase type="file" multiple={false} onDone={({base64}) => setFormData({...formData, image: base64})}/>
                </div>
                <Button type="submit" variant="contained" color="primary">Create Post</Button>
             </form>
        </div>
    )
}

export default CreatePost