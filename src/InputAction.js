import React, { useState, useEffect } from "react"
import { FaPlusCircle } from "react-icons/fa"
import { IconContext } from "react-icons"
import { v4 as uuidv4 } from "uuid";

const InputAction = props => {
    const [editing, setEditing] = useState(false)

	const [inputText, setInputText] = useState({
		title: "",
        stat: "",
        proficient: false,
        hitOrDC: "",
        saveType: "",
        hitBonus: "",
        dmgNum: "",
        dmgSize: "",
        dmgBonus: "",
        abilityBonus: false,
        range: "",
        notes: "",
	})

    const attackSave = [
        {
            id: uuidv4(),
            type: "attack",
            name: "Attack",
        },
        {
            id: uuidv4(),
            type: "save",
            name: "Save",
        },
    ]

    //console.log(props.character)

    const charStats = () => {
        props.character.map(charfield => {
            if(charfield.section === "charStats") {
                console.log(charfield.name, charfield.display, charfield.id, charfield.value)
            }
        })


    }

	const onChange = e => {
		setInputText(prevState => {
			return {
				...inputText,
				[e.target.name]: e.target.value,
			}
		})
	}

    const selectChange = e => {
		setInputText(prevState => {
			return {
				...inputText,
				[e.target.name]: e.target.value,
			}
		})
    }

    const checkChange = e => {
        setInputText(prevState => {
            return {
                ...inputText,
                [e.target.name]: !inputText.proficient,
            }
        })
    }

    const checkChangeAB = e => {
        setInputText(prevState => {
            return {
                ...inputText,
                [e.target.name]: !inputText.abilityBonus,
            }
        })
    }

	const handleSubmit = e => {
		e.preventDefault()
		if(inputText.title.trim()) {
			props.addActionProps(inputText.title,inputText.stat,inputText.proficient,inputText.hitOrDC,inputText.saveType,inputText.dmgNum,inputText.dmgSize,inputText.hitBonus,inputText.dmgBonus,inputText.abilityBonus,inputText.range,inputText.notes)
			setInputText({
				title: "",
                stat: "",
                proficient: false,
                hitOrDC: "",
                saveType: "",
                hitBonus: "",
                dmgNum: "",
                dmgSize: "",
                dmgBonus: "",
                abilityBonus: false,
                range: "",
                notes: "",
            })
		} else {
			alert("Please enter name")
		}
	}

    const actionBonus = () => {
        return inputText.hitOrDC == "attack" && inputText.stat !=="" && inputText.abilityBonus !== false ? (
            <span className="attkBonus">
                <span>+</span>
                <span>
                    {props.character.map((charfield) =>  {
                        return charfield.section == "charStats" && charfield.name == inputText.stat ? (
                            <span key={charfield.id}>{Math.floor((charfield.value - 10) / 2)}</span>
                        ) : (
                            ""
                        )
                        }
                    )}
                </span>
            </span>
        ) : (
            ""
        )
    }

    useEffect(() => {
        setEditing(props.globaledit)
    }, [props.globaledit]);

	return (
		<form onSubmit={handleSubmit} className={`actionForm show_${editing}`}>
            <div className="actionSave">
                <IconContext.Provider
                    value={{
                        className: "submit-icon",
                    }}
                >
                <button className="actionSubmit"><FaPlusCircle/></button>
                </IconContext.Provider>
            </div>
            <div className="actionDetails">
                <div className="actionLabel">Title</div>
                <div className="actionField">
                    <input
                        type="text"
                        className="inputText"
                        placeholder="e.g. Longbow or Fireball"
                        value={inputText.title}
                        name="title"
                        onChange={onChange}
                    />
                </div>
                <div className="actionLabel">Stat</div>
                <div className="actionField">
                <select
                    name="stat"
                    className="inputSelect"
                    value={inputText.stat}
                    onChange={selectChange}
                >
                    <option value=""> - stat - </option>
                {props.character.map((charfield) =>  {
                    return charfield.section == "charStats" ? (
                        <option key={charfield.id} value={charfield.name}>{charfield.display}</option>
                    ) : (
                        ""
                    )
                    }
                )}
                </select>
                </div>
                <div className="actionLabel">Attack / Save</div>
                <div className="actionField">
                <select
                    name="hitOrDC"
                    className="inputSelect"
                    value={inputText.hitOrDC}
                    onChange={selectChange}
                >
                    <option value=""> - Atk / DC - </option>
                    <option value="attack">Attack</option>
                    <option value="save">Save</option>
                    
                </select>
                </div>
                {
                inputText.hitOrDC == "save" ? (<><div className="actionLabel">Save Type</div><div className="actionField"><input
                    type="text"
                    className="inputText"
                    placeholder="e.g. Dex or Athletics"
                    value={inputText.saveType}
                    name="saveType"
                    onChange={onChange}
                /></div></>) : ""
                }
                <div className="actionLabel">Proficient</div>
                <div className="actionField">
                <input
                    name="proficient"
                    type="checkbox"
                    checked={inputText.proficient}
                    onChange={checkChange}
                ></input>
                </div>
                <div className="actionLabel">Damage</div>
                <div className="actionField">
                <input
                    type="text"
                    className="inputNum inputDmg"
                    placeholder="1"
                    value={inputText.dmgNum}
                    name="dmgNum"
                    onChange={onChange}
                />
                <span>d</span>
                <input
                    type="text"
                    className="inputNum"
                    placeholder="6"
                    value={inputText.dmgSize}
                    name="dmgSize"
                    onChange={onChange}
                />
                {
                    inputText.hitOrDC == "attack" && inputText.stat !=="" && inputText.abilityBonus !== false ? (
                        <>
                            <span>+</span>
                            <span>
                                {props.character.map((charfield) =>  {
                                    return charfield.section == "charStats" && charfield.name == inputText.stat ? (
                                        <span key={charfield.id}>{Math.floor((charfield.value - 10) / 2) + parseInt((inputText.dmgBonus === "" ? 0 : inputText.dmgBonus))}</span>
                                    ) : (
                                        ""
                                    )
                                    }
                                )}
                            </span>
                        </>
                ) : (
                    inputText.dmgBonus !== "" ? (
                        <>
                        <span>+</span>
                        <span>{inputText.dmgBonus}</span>
                    </>
                    ) : ""
                )}                
                </div>
                <div className="actionLabel">Stat Bonus</div>
                <div className="actionField">
                {
                    inputText.stat !=="" ? (
                        <input
                            name="abilityBonus"
                            type="checkbox"
                            checked={inputText.abilityBonus}
                            onChange={checkChangeAB}
                        ></input>
                    ) : ""
                }
                </div>

                <div className="actionLabel">Bonuses</div>
                <div className="actionField">
                    <input
                        type="text"
                        className="inputNum inputDmg"
                        placeholder="0"
                        value={inputText.hitBonus}
                        name="hitBonus"
                        onChange={onChange}
                    />
                    /
                    <input
                        type="text"
                        className="inputNum"
                        placeholder="0"
                        value={inputText.dmgBonus}
                        name="dmgBonus"
                        onChange={onChange}
                    />
                </div>

                <div className="actionLabel">Range / Area</div>
                <div className="actionField">
                    <input
                        type="text"
                        className="inputText"
                        placeholder="e.g. 120ft / 20ft radius"
                        value={inputText.range}
                        name="range"
                        onChange={onChange}
                    />
                </div>

                <div className="actionLabel">Notes</div>
                <div className="actionField">
                    <input
                        type="text"
                        className="inputText"
                        placeholder="Other details"
                        value={inputText.notes}
                        name="notes"
                        onChange={onChange}
                    />
                </div>
            </div>
		</form>
	)
}

export default InputAction
