import React from "react"
import SkillField from "./SkillField"

const CharSkills = props => {


//	console.log(props.character)

	return (
		<div className="section charSkills">
			<div className="sectionTitle">Skills</div>
			{props.character.map(charfield => {
				if(charfield.section === "charSkills") {
					return (
					<SkillField
						key={charfield.id}
						charfield={charfield}
						charstats={props.character}
						prof={props.prof}
						setUpdate={props.setUpdate}
						handleChangeProps={props.handleChangeProps}
						handleChangeSkillsProps={props.handleChangeSkillsProps}
						globaledit={props.globaledit}
						roll20Props={props.roll20Props}
					/>
					)
				}
			})}
		</div>
	)
}
export default CharSkills
