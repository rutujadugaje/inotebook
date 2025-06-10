import noteContext from "../context/notes/noteContext"
import { useContext, useEffect } from "react"

const About = () => {
  const a = useContext(noteContext)
  useEffect(() => {
    a.update()
  }, [])
  
  return (
    <div>
      This is About {a.name} and he is in class {a.class}
      </div>
  )
}

export default About