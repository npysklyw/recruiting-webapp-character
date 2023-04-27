import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

// First I consider the fact each character is a kind of object
// We will render each character simply{Attributes: [], Classes:, Skills:[]}



function App() {
  const [num, setNum] = useState(0);
  const [characters,setCharacters] = useState([{name: 0,att: [13,10,10,10,10,10],skills: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],points: 10},{name: 1,att: [0,0,0,0,0,0],skills: [0,0,0,0,0,0,0,0,0,0]}])
  //Renders characters

  function CharacterRender({ stats }) {
    return stats.map(item => (
      <div>
        <h1>{"Character "+ item.name}</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
        <Attributes stats={item} />
        <Classes stats={item} />
  
    
        <Skills stats={item} />

        </div></div>
    ));
}

//Enforce checking of the values
const addSkill = (index,name,modify) =>{


  const newItems = [...characters];
  newItems[name].points = newItems[name].points - 1;
  newItems[name].skills[index] = newItems[name].skills[index] + modify ;
  setCharacters(newItems)

}

//Enforce checking of the values
const removeSkill = (index,name,modify) =>{

  const newItems = [...characters];
  newItems[name].points = newItems[name].points + 1;
  newItems[name].skills[index] = newItems[name].skills[index] + modify ;
  setCharacters(newItems)

}

//Both functions used to regulate max, mins
function skillAllowed(s) {
    return s.points <= 0;
}

function zero(s) {
  return s.points == 10;
}

function Skills({ stats }) {
  
  return ( <div>
    <h1>Skills</h1>
    <h3>Skill Points: {stats.points}</h3>
    <div>
      <div class="row">

      {stats.skills.map((item,index) => (

        <div>
      <div class="column">{ SKILL_LIST[index].name + " : " + item + " (Modifier: " + SKILL_LIST[index].attributeModifier + "): " + returnMod(Number(item))}</div>
      <button onClick={() => addSkill(index,stats.name,1)} disabled={skillAllowed(stats)}>+</button>
      <button onClick={() => removeSkill(index,stats.name,-1)} disabled={zero(stats)}>-</button>
      </div >
  ))}

    </div> 
    </div>
  </div>)

}

//Will return modifier based on value of attribute
function returnMod(value) {
  return Math.floor((value - 10) / 2)
}



function checkSum(attributes) {
  console.log(attributes)
  return attributes.reduce((result,number)=> result+number) > 70;
} 

//Enforce checking of the values
const updateAttribute = (index,name,modify) =>{

  const newItems = [...characters];
  newItems[name].att[index] = newItems[name].att[index] + modify ;
  setCharacters(newItems)

}

function Attributes({ stats }) {
  return ( <div>
    <h1>Attributes</h1>
    <div>
      <div class="row">

      {stats.att.map((item,index) => (

        <div>
      <div class="column">{ ATTRIBUTE_LIST[index] + " : " + item + " (Modifier: " + returnMod(Number(item))  + ")"}</div>
      <button onClick={() => updateAttribute(index,stats.name,1)} disabled={checkSum(stats.att)}>+</button>
      <button onClick={() => updateAttribute(index,stats.name,-1)}>-</button>
      </div >
  ))}

    </div> 
    </div>
  </div>)

}

function checkValidClass(classname,playeratt) {
  console.log(playeratt)
  for (let i = 0; i < playeratt.size;i++) {

    if (playeratt[i] < classname[i]) {
      return false;
    }
  }

  return true;

}

function Classes({ stats }) {
  return ( <div>
    <h1>Classes</h1>
    <div>
      <div class="row">

      {Object.keys(CLASS_LIST).map((item,index) => (

        <div>
      <div class="column"> <p style={{ color:  checkValidClass(CLASS_LIST.item,stats.att) ? "black" : "white" }}>{item}</p></div>
      </div >
  ))}

    </div> 
    </div>
  </div>)

}



  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          {/* Value:
          {num} */}
          <CharacterRender stats={characters} />
          
          
        </div>
      </section>
    </div>
  );
}

export default App;
