import React from 'react'

const CustomInput = (props) => {
    const { type, label, i_id, i_class, name, val, onchng, onblr} = props;
  return (
    <>
        <div className='form-floating mt-3'>
            <input type={type} className={`form-control ${i_class}`} placeholder={label} value={val} onChange={onchng} onBlur={onchng} name={name} id={i_id} />
            <label htmlFor={label}>{label}</label>

        </div>
    </>
  )
}

export default CustomInput