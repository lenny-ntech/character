import React, { useState, useEffect } from "react"

const StatField = props => {
    const [editing, setEditing] = useState(false)

    const handleEditing = () => {
        //setEditing(true)
        console.log("editing")
    }

    const handleUpdateDone = (event) => {
		if (event.key === "Enter") {
			setEditing(false)
		}
	}

    const handleRoll20 = (calc,name,display) => {
        props.roll20Props(calc,name,display)
        console.log(calc,name,display)
    }

    const {name, display, id, value} = props.charfield

    const calc = Math.floor((value - 10) / 2);

    useEffect(() => {
        setEditing(props.globaledit)
    }, [props.globaledit]);

    return (
        <div className="fieldGroup">
            <div className="fieldDisplay" onClick={() => { handleRoll20(calc,name,display) }}>{display.slice(0,3)}</div>
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
            <div className="statCalc">
                {calc}
            </div>
        </div>
    )
}

export default StatField