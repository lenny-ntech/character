import React, { useState, useEffect } from "react"
import { FaTrash } from "react-icons/fa"
import { GiRollingDices } from "react-icons/gi"
import { BsArrowDownUp } from "react-icons/bs"
import { IconContext } from "react-icons"


const ActionItem = props => {

	const [editing, setEditing] = useState(false)

	const handleUpdateDone = (event) => {
		if (event.key === "Enter") {
			setEditing(false)
		}
	}

	const { stat, proficient, hitOrDC, saveType, dmgNum, dmgSize, range, notes, hitBonus, dmgBonus, abilityBonus, id, title } = props.action

    var statValue = 0;
    var statBonus = 0;
    var level = props.character.find(element => element.name === "charLevel")
	var prof = Math.floor((parseInt(level.value) -1 ) / 4) + 2
    //console.log(props.character)

    console.log(dmgNum, dmgSize, hitBonus, dmgBonus, abilityBonus)

    props.character.map(charfield => {
        if(charfield.name === stat){
        //    console.log(hitOrDC)
            statBonus = Math.floor((charfield.value - 10) / 2)
            if(hitOrDC === "attack"){
                statValue = Math.floor((charfield.value - 10) / 2) + (proficient ? prof : 0)
            }
            if (hitOrDC === "save"){
                statValue = 8 + Math.floor((charfield.value - 10) / 2) + (proficient ? prof : 0)
            }
        }
    //    console.log(statValue)
    })
    
	
	let viewMode = {};
	let editMode = {};

	if (editing) {
		viewMode.display = 'none';
	} else {
		editMode.display = 'none';
	}

    const handleRoll20 = (calc,name,display) => {
        props.roll20Props(calc,name,display)
    }


	useEffect(() => {
		return () => {
		//	console.log("cleaning up")
		}
	}, [])

    useEffect(() => {
        setEditing(props.globaledit)
    }, [props.globaledit]);

    const actionClick = () => {
        if(hitOrDC === "attack"){
            handleRoll20((statValue + parseInt((hitBonus === "" ? 0 : hitBonus))),hitOrDC,title)
        }
    }

    const damageClick = () => {
        var bonus = parseInt((dmgBonus === "" ? 0 : dmgBonus)) + parseInt((abilityBonus ? statBonus : 0))
        props.rollDamageProps(dmgNum,dmgSize,bonus,"damage",title)
    }

    const [isActive, setActive] = useState("false");
    const handleToggle = () => {
        setActive(!isActive);
    };



	return (
		<li className="actionItem">
			<div className={`displayAction show_${!editing}`}>
				<div className={`actionTitle actionType_${hitOrDC}`} onClick={actionClick}>{title}<IconContext.Provider value={{ className: "rollHover", }}><GiRollingDices/></IconContext.Provider></div>
                <div className="actionRolls">
                    {hitOrDC === "save" ? "DC "  : "Attack +" }{statValue + parseInt((hitBonus === "" ? 0 : hitBonus))} {saveType !== "" ? saveType : ""}
                    &nbsp;&nbsp; 
                    <span className="actionDamage" onClick={damageClick}>{dmgNum}d{dmgSize}+{parseInt((dmgBonus === "" ? 0 : dmgBonus)) + parseInt((abilityBonus ? statBonus : 0))}<IconContext.Provider value={{ className: "rollHover", }}><GiRollingDices/></IconContext.Provider></span>
                    {range !== "" ? (<span className="actionRange">{range}</span>) : ""}
                </div>
                {notes !== "" ? (<div className="actionNotes">{notes}</div>) : ""}
                
			</div>
            <div className={`editAction show_${editing}`}>
                <div className="actionHeader">
                    <div className="editTitle" onClick={handleToggle}>{title} <button className="actionShowDetails"><BsArrowDownUp className="toggleButton" /></button></div>
                    <button className="actionSubmit" onClick={() => props.deleteActionProps(id)}><FaTrash style={{ color: "orangered", fontSize: "16px" }} /></button>
                </div>
                <div className={`actionDetails ${isActive ? "showActionDetails" : ""}`}>
                    <div className="actionLabel">Title</div>
                    <div className="actionField">
                        <input 
                            type="text"
                            name="title"
                            value={title} 
                            onChange={(e)=> {
                                props.setUpdateAction(e.target.value, "title", id)
                            }}
                            onKeyDown={handleUpdateDone}
                        />
                    </div>
                    <div className="actionLabel">Stat</div>
                    <div className="actionField">
                        <select
                            name="stat"
                            className="inputSelect"
                            value={stat}
                            onChange={(e)=> {
                                props.setUpdateAction(e.target.value, "stat", id)
                            }}
                        >
                            <option value=""> - stat - </option>
                        {props.character.map((charfield) =>  {
                            return charfield.section === "charStats" ? (
                                <option key={charfield.id} value={charfield.name}>{charfield.display}</option>
                            ) : (
                                ""
                            )
                            }
                        )}
                        </select>
                    </div>
                    <div className="actionLabel">Attack/Save</div>
                    <div className="actionField">
                        <select
                            name="hitOrDC"
                            className="inputSelect"
                            value={hitOrDC}
                            onChange={(e)=> { props.setUpdateAction(e.target.value, "hitOrDC", id) }}
                        >
                            <option value=""> - Atk / DC - </option>
                            <option value="attack">Attack</option>
                            <option value="save">Save</option>
                        </select>
                    </div>
                    <div className="actionLabel">Proficient</div>
                    <div className="actionField">
                        <input
                            name="proficient"
                            type="checkbox"
                            checked={proficient}
                            onChange={(e)=> { props.setUpdateAction(!proficient, "proficient", id) }}
                        ></input>
                    </div>
                    <div className="actionLabel">Damage</div>
                    <div className="actionField">
                        <input
                            type="text"
                            className="inputNum inputDmg"
                            value={dmgNum}
                            name="dmgNum"
                            onChange={(e)=> { props.setUpdateAction(e.target.value, "dmgNum", id) }}
                        />
                        <span>d</span>
                        <input
                            type="text"
                            className="inputNum"
                            value={dmgSize}
                            name="dmgSize"
                            onChange={(e)=> { props.setUpdateAction(e.target.value, "dmgSize", id) }}
                        />
                    </div>
                    <div className="actionLabel">Stat Bonus</div>
                    <div className="actionField">
                       <input
                            name="abilityBonus"
                            type="checkbox"
                            checked={abilityBonus}
                            onChange={(e)=> { props.setUpdateAction(!abilityBonus, "abilityBonus", id) }}
                        />
                    </div>
                    <div className="actionLabel">Bonuses</div>
                    <div className="actionField">
                        <input
                            type="text"
                            className="inputNum"
                            value={hitBonus}
                            name="hitBonus"
                            onChange={(e)=> { props.setUpdateAction(e.target.value, "hitBonus", id) }}
                        />
                        /
                        <input
                            type="text"
                            className="inputNum"
                            value={dmgBonus}
                            name="dmgBonus"
                            onChange={(e)=> { props.setUpdateAction(e.target.value, "dmgBonus", id) }}
                        />
                    </div>
                    <div className="actionLabel">Range / Area</div>
                    <div className="actionField">
                        <input
                            type="text"
                            value={range}
                            name="range"
                            onChange={(e)=> { props.setUpdateAction(e.target.value, "range", id) }}
                        />
                    </div>
                    <div className="actionLabel">Notes</div>
                    <div className="actionField">
                        <input
                            type="text"
                            value={notes}
                            name="notes"
                            onChange={(e)=> { props.setUpdateAction(e.target.value, "notes", id) }}
                        />
                    </div>
                </div>
                
                
            </div>
		</li>
	)
}

export default ActionItem
