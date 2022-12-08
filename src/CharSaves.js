import React from "react"
import SaveField from "./SaveField"

const CharSaves = props => {

//	console.log(props.character)

	return (
		<div className="section charSaves">
			<div className="sectionTitle">Saves</div>
			{props.character.map(charfield => {
				if(charfield.section === "charSaves") {
					return (
					<SaveField
						key={charfield.id}
						charfield={charfield}
						charstats={props.character}
						prof={props.prof}
						setUpdate={props.setUpdate}
						handleChangeProps={props.handleChangeProps}
						globaledit={props.globaledit}
						roll20Props={props.roll20Props}
					/>
					)
				}
			})}
		</div>
	)
}
export default CharSaves
