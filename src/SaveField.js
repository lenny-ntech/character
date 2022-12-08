import React, { useState, useEffect } from "react"

const SaveField = props => {
    const [editing, setEditing] = useState(false)

    const handleUpdateDone = (id) => {
            props.handleChangeProps(id)
	}

    const handleRoll20 = (calc,name,display) => {
        props.roll20Props(calc,name,display)
    //    console.log(calc)
    }


    const {name, display, id, value} = props.charfield
    //console.log(props.charstats)
    var saveStat = "";
    const setStat = () => {
        props.charstats.map(stat => {
            if(stat.display === display && stat.section === "charStats") {
            //    console.log(stat.display, display, stat.value)
                saveStat = Math.floor((stat.value - 10) / 2);
            }
        })
    }
    setStat();
//    console.log(saveStat)


    const calc = saveStat + (value ? props.prof : 0);

    useEffect(() => {
        setEditing(props.globaledit)
    }, [props.globaledit]);

    return (
        <div className="fieldGroup">
            <div className="fieldDisplay" onClick={() => { handleRoll20(calc,name,display) }}>{display}</div>
            <div className={`charField ${name}`}>
                <div className={`displayField showedit_${editing}`}>
                    {calc}
                </div>
                <div className={`radioButton checked_${value}`}>
                    <input
                        type="checkbox"
                        className={`editCheck edit${editing}`}
                        checked={value}
                        onChange={() => { handleUpdateDone(id) }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SaveField