import React from "react"
import CharField from "./CharField"

const CharInfo = props => {

//	const [editing, setEditing] = useState(false)

//	const [info, setInfo] = useState(character)


//	const handleEditing = () => {
//		setEditing(!editing)
//	}

//	console.log(props.character)

	return (
		<div className="section charInfo">
			{props.character.map(charfield => {
				if(charfield.section === "charInfo") {
					return (
					<CharField
						key={charfield.id}
						charfield={charfield}
						setUpdate={props.setUpdate}
						globaledit={props.globaledit}
					/>
					)
				}
			})}
		</div>
	)
}
export default CharInfo
