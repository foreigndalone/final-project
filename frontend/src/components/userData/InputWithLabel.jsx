import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const InputWithLabel = ({ id, label, type = "text", value, setData }) => {
  const handleChange = (e) => {
    setData(e.target.value);
  }

  return (
    <div>
      <input id={id} type={type} value={value} onChange={handleChange} placeholder={label} />
    </div>
  )
}

export default InputWithLabel