import React, { useState, useEffect } from "react"

const SkillField = props => {
    const [editing, setEditing] = useState(false)

    const handleEditing = () => {
        setEditing(true)
    }

    const handleUpdateDone = (id) => {
            props.handleChangeProps(id)
	}

    const handleUpdateSkillsDone = (id) => {
        props.handleChangeSkillsProps(id)
    }

    const {name, display, id, value, expertise, stat} = props.charfield
//    console.log(props.charfield, props.charstats)
    var saveStat = "";
    const setStat = () => {
        props.charstats.map(charstat => {
            if(charstat.section === "charStats"){
        //    console.log(charstat.display)
            }
            if(charstat.display === stat && charstat.section === "charStats") {
            //    console.log(charstat.value)
                saveStat = Math.floor((charstat.value - 10) / 2);
            }
        })
    }
    setStat();
 //   console.log(saveStat)

    const handleRoll20 = (calc,name,display) => {
        props.roll20Props(calc,name,display)
    //    console.log(calc)
    }

    const calc = saveStat + (value ? parseInt(props.prof) : 0) + (expertise ? props.prof : 0);

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
                <div className={`radioButton skillExpertise checked_${expertise}`}>
                    <input
                        type="checkbox"
                        className={`editCheck edit${editing}`}
                        checked={expertise}
                        onChange={() => { handleUpdateSkillsDone(id) }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SkillField