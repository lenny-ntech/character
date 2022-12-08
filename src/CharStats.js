import React from "react"
import StatField from "./StatField"

const CharStats = props => {


//	console.log(props.character)

	return (
		<div className="section charStats">
			{props.character.map(charfield => {
				if(charfield.section === "charStats") {
					return (
					<StatField
						key={charfield.id}
						charfield={charfield}
						setUpdate={props.setUpdate}
						globaledit={props.globaledit}
						roll20Props={props.roll20Props}
					/>
					)
				}
			})}
		</div>
	)
}
export default CharStats
