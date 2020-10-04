import React from 'react'
import styled from 'styled-components'

const InputField = ({ ...props }) => {
  return <InputFieldContainer className="w-full" {...props} />
}

export default InputField

const InputFieldContainer = styled.input`
  margin-bottom: 15px;
  background-color: white;
  padding: 11px 16px;
  border-radius: 17px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  line-height: 1.3333333;
  outline: none;

  &:focus {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
    border-color: #66afe9;
  }
`
