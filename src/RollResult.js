import React from "react"

const RollResult = props => {

    const {rollResult, rollID, rollBonus} = props.roll

    console.log(props)
	return (
		<li className="rollResult">
			<div>{rollResult}</div>
		</li>
	)
}

export default RollResult
