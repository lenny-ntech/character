import React from "react"
import ActionItem from "./ActionItem";

const Actions = props => {
	return (
		<ul className="actionList">
			{props.actions.map(action => (
				<ActionItem
					key={action.id}
					action={action}
                    character={props.character}
					handleChangeProps={props.handleChangeProps}
					deleteActionProps={props.deleteActionProps}
					setUpdateAction={props.setUpdateAction}
                    globaledit={props.globaledit}
                    roll20Props={props.roll20Props}
                    rollDamageProps={props.rollDamageProps}
                    />
			))}
		</ul>
	)
}

export default Actions
