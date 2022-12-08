import React, { useState, useEffect } from "react"

const CharField = props => {
    const [editing, setEditing] = useState(false)

    const handleEditing = () => {
        setEditing(true)
    }

    const handleUpdateDone = (event) => {
		if (event.key === "Enter") {
			setEditing(false)
		}
	}

    const {name, display, id, value} = props.charfield

    useEffect(() => {
        setEditing(props.globaledit)
    }, [props.globaledit]);

    return (
        <div className={`fieldGroup group${name}`}>
            <div className="fieldDisplay">{display}</div>
            <div className={`charField ${name}`}>
                <div onDoubleClick={handleEditing} className={`displayField show_${!editing}`}>
                    {value}
                </div>
                <input
                    type="text"
                    className={`editField show_${editing}`}
                    value={value}
                    onChange={(e) => {
                        props.setUpdate(e.target.value, id)
                    }}
                    onKeyDown={handleUpdateDone}
                />
            </div>
        </div>
    )
}

export default CharField