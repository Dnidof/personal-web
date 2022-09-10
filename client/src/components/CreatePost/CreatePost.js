import { useState } from "react"
import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Input from "./Input"
import "./styles.css"


const initialState = {title: "Title", sections: [], tags: []}
const CreatePost = () => {
    const navigate = useNavigate()
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
            console.log(formData)
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
                <div>{new Date().toDateString()}</div>
                <div>{formData.tags.map((tag) => <span>#{tag}</span>)}</div>
                <Input name="tags" label="Tags" handleChange={handleTags} />
                <Button type="submit" variant="contained" color="primary">Create Post</Button>
             </form>
        </div>
    )
}

export default CreatePost