import React, {useState , useEffect} from "react"
import { BiTargetLock } from "react-icons/bi"
import { GiGooeyImpact, GiFist, GiSkills, GiShield, GiLightBulb } from "react-icons/gi"
import { IconContext } from "react-icons"
import RollResult from "./RollResult"

const DiceRolls = props => {
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        setEditing(props.globaledit)
    }, [props.globaledit]);
/*
	props.rolls.map(roll => { 
        console.log("roll", roll);
    })
*/
    const rollType = (name, display) => {
        switch(name.slice(0,4)) {
            case 'save':
                return display + " save: "; //display.slice (0,3) + " save: ";
            case 'skil':
                return display + " check: ";
            case 'stat':
                return display + " check: "
            case 'atta':
                return display + " attack: "
            case 'dama':
                return display + " damage: "
            }
    }

    const rollIcon = (name) => {
        console.log("rollIcon ", name)
        switch(name.slice(0,4)) {
            case 'save':
                return <IconContext.Provider value={{ className: "saveIcon", }}><GiShield/></IconContext.Provider>
            case 'skil':
                return <IconContext.Provider value={{ className: "skillIcon", }}><GiLightBulb/></IconContext.Provider>
            case 'stat':
                return <IconContext.Provider value={{ className: "statIcon", }}><GiSkills/></IconContext.Provider>
            case 'atta':
                return <IconContext.Provider value={{ className: "attackIcon", }}><BiTargetLock/></IconContext.Provider>
            case 'dama':
                return <IconContext.Provider value={{ className: "damageIcon", }}><GiGooeyImpact/></IconContext.Provider>
           }
    }

    const handleClear = () => {
        props.clearRollsProps()
    }
	return (
		<div className="section diceRolls">
            <div className="rollboxHeader">Rolls</div>
            <div onClick={handleClear} className={`clearRolls show_${editing}`}>
                <IconContext.Provider value={{ className: "damageIcon", }}><GiGooeyImpact/></IconContext.Provider>
            </div>
            <ul>
               {props.rolls.map(roll=> {
                    if(roll.rollName !== "save"){
                        return <li key={roll.rollId} className={`rollItem ${roll.rollResult == 20 ? "crit" : "" } ${roll.rollResult == 1 && roll.rollName !== "damage" ? "fumble" : "" }`}>
                            <div className="actionRoll">
                                <div className="rollIcon">{rollIcon(roll.rollName)}</div>
                                <div className="rollName">{rollType(roll.rollName, roll.rollDisplay)}</div>
                                <div className="rollResult">{roll.rollResult + roll.rollBonus}</div>
                                <div className="rollBonus">{roll.rollResult} + {roll.rollBonus}</div>
                            </div>
                            {
                                console.log(roll.rollName,roll.rollDetails)
                            }
                            {
                                roll.rollName === "damage" && roll.rollDetails !== "" && roll.rollDetails.length > 1 ?  (<div className="damageRoll">
                                    {   
                                        roll.rollDetails.map((rollDetail, i) => {
                                            return <span key={i}>{rollDetail}<em> + </em></span>
                                        })
                                    }
                                </div>) : ""
                            }
                        </li>
                    }
               })}
            </ul>
		</div>
	)
}
export default DiceRolls
