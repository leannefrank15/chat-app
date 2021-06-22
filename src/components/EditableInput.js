import React, { useState, useCallback} from 'react'
import { InputGroup, Input, Icon, Alert } from 'rsuite'


const EditableInput = ({initialValue, onSave, label=null, placeholder="enter your value", emptyMsg="input is empty", ...inputProps}) => {

  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable]= useState(false);
  const onInputChange = useCallback((value) => {
      setInput(value);
  },[])

  const onEditClick = useCallback(() => {
    setIsEditable(p => !p);
    setInput(initialValue); //when you click on 'x' it should set back to 'Leanne Frank' therefore we use this
  },[initialValue])

  const onSaveClick = async () => {
     const trimmed_val = input.trim();
     if(trimmed_val=== ''){
       Alert.info(emptyMsg, 4000);
     }
     if(trimmed_val!== initialValue){
        await onSave(trimmed_val);
     }

     setIsEditable(false);

    }
  
  return (
    <div>
      {label}
      <InputGroup>
      <Input {...inputProps}
      disabled={!isEditable}
       placeholder={placeholder}
      onChange={onInputChange} 
      value={input}
      />
      <InputGroup.Button onClick={onEditClick}>
         <Icon icon={isEditable ? 'close' : 'edit2'}/>
      </InputGroup.Button>
      {isEditable && 
       <InputGroup.Button onClick={onSaveClick}>
       <Icon icon="check"/>
       </InputGroup.Button>
      }
      </InputGroup>
    </div>
  )
}

export default EditableInput
