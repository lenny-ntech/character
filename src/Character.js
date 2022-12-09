import React, { useState, useEffect} from "react"
import { v4 as uuidv4 } from "uuid";

import CharInfo from './CharInfo';
import CharStats from './CharStats';
import CharSaves from './CharSaves';
import CharSkills from './CharSkills';
import DiceRolls from "./DiceRolls";
import Actions from "./Actions"
import InputAction from "./InputAction"


const Character = () => {
	function getCharDetails() {
		const temp = localStorage.getItem("character")
		const savedChar = JSON.parse(temp)
		return savedChar || 
		[
			{
				id: uuidv4(),
				name: "charName",
				display: "Name",
				value: "Name",
				section: "charInfo",
			},
			{
				id: uuidv4(),
				name: "charClass",
				display: "Class",
				value: "Class",
				section: "charInfo",
			},
			{
				id: uuidv4(),
				name: "charLevel",
				display: "Level",
				value: "0",
				section: "charInfo",
			},
			{
				id: uuidv4(),
				name: "statStr",
				display: "Strength",
				value: "10",
				section: "charStats",
			},
			{
				id: uuidv4(),
				name: "statCon",
				display: "Constitution",
				value: "10",
				section: "charStats",
			},
			{
				id: uuidv4(),
				name: "statDex",
				display: "Dexterity",
				value: "10",
				section: "charStats",
			},
			{
				id: uuidv4(),
				name: "statInt",
				display: "Intelligence",
				value: "10",
				section: "charStats",
			},
			{
				id: uuidv4(),
				name: "statWis",
				display: "Wisdom",
				value: "10",
				section: "charStats",
			},
			{
				id: uuidv4(),
				name: "statCha",
				display: "Charisma",
				value: "10",
				section: "charStats",
			},
			{
				id: uuidv4(),
				name: "saveStr",
				display: "Strength",
				value: false,
				section: "charSaves",
			},
			{
				id: uuidv4(),
				name: "saveCon",
				display: "Constitution",
				value: false,
				section: "charSaves",
			},
			{
				id: uuidv4(),
				name: "saveDex",
				display: "Dexterity",
				value: false,
				section: "charSaves",
			},
			{
				id: uuidv4(),
				name: "saveInt",
				display: "Intelligence",
				value: false,
				section: "charSaves",
			},
			{
				id: uuidv4(),
				name: "saveWis",
				display: "Wisdom",
				value: false,
				section: "charSaves",
			},
			{
				id: uuidv4(),
				name: "saveCha",
				display: "Charisma",
				value: false,
				section: "charSaves",
			},

			{
				id: uuidv4(),
				name: "skillAcrobatics",
				display: "Acrobatics",
				stat: "Dexterity",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skillAnimal",
				display: "Animal Handling",
				stat: "Wisdom",
				value: false,
				expertise: false,
				section: "charSkills",
			},{
				id: uuidv4(),
				name: "skillArcana",
				display: "Arcana",
				stat: "Intelligence",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skillAthletics",
				display: "Athletics",
				stat: "Strength",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skillDeception",
				display: "Deception",
				stat: "Charisma",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skillHistory",
				display: "History",
				stat: "Intelligence",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Insight",
				stat: "Wisdom",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Intimidation",
				stat: "Charisma",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Investigation",
				stat: "Intelligence",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Medicine",
				stat: "Wisdom",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Nature",
				stat: "Intelligence",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Perception",
				stat: "Wisdom",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Performance",
				stat: "Charisma",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Persuasion",
				stat: "Charisma",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Religion",
				stat: "Intelligence",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Sleight of Hand",
				stat: "Dexterity",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Stealth",
				stat: "Dexterity",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			{
				id: uuidv4(),
				name: "skill",
				display: "Survival",
				stat: "Wisdom",
				value: false,
				expertise: false,
				section: "charSkills",
			},
			
		]
	}

	function getInitialActions() {
		// getting stored items
		const temp = localStorage.getItem("actions")
		const savedActions = JSON.parse(temp)
		return savedActions || []
	}
	const [actions, setActions] = useState(getInitialActions())

	const handleChangeAction = id => {
		setActions(prevState => 
			prevState.map(action => {
				if (action.id === id){
					return {
						...action,
						completed: !action.completed
					}
				}
				return action
			})
		)
	}

	const delAction = id => {
		setActions([
			...actions.filter(action => {
				return action.id !== id;
			})
		])
	}

	const addActionItem = (title, stat, proficient, hitOrDC, saveType, dmgNum, dmgSize, hitBonus, dmgBonus, abilityBonus, range, notes) => {
		const newAction = {
			id: uuidv4(),
			title: title,
			stat: stat,
			proficient: proficient,
			hitOrDC: hitOrDC,
			saveType: saveType,
			dmgNum: dmgNum,
			dmgSize: dmgSize,
			hitBonus: hitBonus,
			dmgBonus: dmgBonus,
			abilityBonus: abilityBonus,
			range: range,
			notes: notes,
		}
		setActions([...actions, newAction])
	}

	const setUpdateAction = (updatedValue, updatedName, id) => {
		setActions(
			actions.map(action => {
				if(action.id === id) {
					switch(updatedName) {
						case 'title':
							return {
								...action,
								title: updatedValue
							}
						case 'stat':
							return {
								...action,
								stat: updatedValue
							}
						case 'hitOrDC':
							return {
								...action,
								hitOrDC: updatedValue
							}
						case 'proficient':
							return {
								...action,
								proficient: updatedValue
							}
						case 'saveType':
							return {
								...action,
								saveType: updatedValue
							}
						case 'dmgNum':
							return {
								...action,
								dmgNum: updatedValue
							}
						case 'dmgSize':
							return {
								...action,
								dmgSize: updatedValue
							}
						case 'hitBonus':
							return {
								...action,
								hitBonus: updatedValue
							}
						case 'dmgBonus':
							return {
								...action,
								dmgBonus: updatedValue
							}
						case 'abilityBonus':
							return {
								...action,
								abilityBonus: updatedValue
							}
						case 'range':
							return {
								...action,
								range: updatedValue
							}
						case 'notes':
							return {
								...action,
								notes: updatedValue
							}
						}
			
					
				}
				return action
			})
		)
	}

	const [character, setCharacter] = useState(getCharDetails())

	const setUpdate = (updatedValue, id) => {
		setCharacter(
			character.map(charfield =>{
				if(charfield.id === id) {
					charfield.value = updatedValue
				}
				return charfield
			})
		)
	}

	const handleChange = id => {
		setCharacter(prevState => 
			prevState.map(charfield => {
				if (charfield.id === id){
					return {
						...charfield,
						value: !charfield.value
					}
				}
				return charfield
			})
		)
	}

	const handleChangeSkills = id => {
		setCharacter(prevState => 
			prevState.map(charfield => {
				if (charfield.id === id){
					return {
						...charfield,
						expertise: !charfield.expertise
					}
				}
				return charfield
			})
		)
	}

	const level = character.find(element => element.name === "charLevel")
	const prof = Math.floor((parseInt(level.value) -1 ) / 4) + 2

	function getInitialRolls() {
		// getting stored items
		const tempRolls = localStorage.getItem("rolls")
		const savedRolls = JSON.parse(tempRolls)
		return savedRolls || []
	}
	const [rolls, setRoll] = useState(getInitialRolls())
	
	const roll20 = (bonus, name, display) => {
	//	console.log("rolling 20", bonus)
	//	setRoll(Math.floor(Math.random() * 20) + bonus)
		const newRoll = {
			rollId: uuidv4(),
			rollResult: Math.floor(Math.random() * 20) + 1,
			rollBonus: bonus,
			rollName: name,
			rollDisplay: display,
			rollDetails: "",
		}

	//	console.log(newRoll)
		setRoll([newRoll, ...rolls])
	}
	//console.log(rolls)

	const rollDamage = (rollNum,rollSize,rollBonus,name,display) => {
		//console.log(rollNum,rollSize,rollBonus,name,display)
	
		var dmgRolls = []
		var total = 0
		var roll = 0
		let i = 0;
		do {
			roll = Math.floor(Math.random() * parseInt(rollSize)) + 1
			dmgRolls.push(roll)
			total = total + roll
			i++
		} while (i < rollNum)

		//console.log(total, dmgRolls)
	
		const newRoll = {
			rollId: uuidv4(),
			rollResult: total,
			rollBonus: rollBonus,
			rollName: name,
			rollDisplay: display,
			rollDetails: dmgRolls,
		}
		//console.log(newRoll)
		setRoll([newRoll, ...rolls])
	}

	const [globaledit, setGlobalEdit] = useState(false)
	const handleGlobalEdit = () => {
		setGlobalEdit(true)
	}
	const handleGlobalSave = () => {
		setGlobalEdit(false)
	}

	const clearRolls = () => {
		console.log("going clear")
		localStorage.removeItem("rolls")
		setRoll([])
	}

	useEffect(() => {
		const temp = JSON.stringify(character)
		const tempActions = JSON.stringify(actions)
		const tempRolls = JSON.stringify(rolls)
		localStorage.setItem("character", temp)
		localStorage.setItem("actions", tempActions)
		localStorage.setItem("rolls", tempRolls)
	}, [character,actions,rolls])

	return (
		<div className="container">
			<div className="charContainer">
				<div className="editButtons">
					<div className={`editButton edit${globaledit}`} onClick={handleGlobalEdit}>Edit</div>
					<div className={`saveButton edit${globaledit}`} onClick={handleGlobalSave}>Save</div>
				</div>
				<CharInfo
					character={character}
					setUpdate={setUpdate}
					globaledit={globaledit}
				/>
				<div className="charDetails">
					<div className="statsContainer">
						<CharStats
							character={character}
							setUpdate={setUpdate}
							globaledit={globaledit}
							roll20Props={roll20}
						/>
					</div>
					<div className="savesSkillsContainer">
						<CharSaves
							character={character}
							setUpdate={setUpdate}
							handleChangeProps={handleChange}
							prof={prof}
							globaledit={globaledit}
							roll20Props={roll20}
						/>
						<CharSkills
							character={character}
							setUpdate={setUpdate}
							handleChangeProps={handleChange}
							handleChangeSkillsProps={handleChangeSkills}
							prof={prof}
							globaledit={globaledit}
							roll20Props={roll20}
						/>
					</div>
				</div>
			</div>
			<div className="actionContainer">
				<div className="containerTitle">Actions</div>
				<InputAction
					character={character}
					globaledit={globaledit}
					addActionProps={addActionItem}
				/>
				<Actions
					actions={actions}
					character={character}
					setUpdateAction={setUpdateAction}
					handleChangeProps={handleChangeAction}
					deleteActionProps={delAction}
					prof={prof}
					globaledit={globaledit}
					roll20Props={roll20}
					rollDamageProps={rollDamage}
				/>
			</div>
			<div className="rollContainer">
				<div className="rollContainerHeader">Rolls</div>
				<DiceRolls 
					rolls={rolls}
					globaledit={globaledit}
					clearRollsProps={clearRolls}
				/>
			</div>
		</div>
	)
}
export default Character
