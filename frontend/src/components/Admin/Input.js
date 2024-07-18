import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Input, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TagInput=  ({ onAddDetail }) => {
  const [inputValues, setInputValues] = useState({ color: '', size: '' });
  const [tags, setTags] = useState([]);

  const handleClose = removedTag => {
    const updatedTags = tags.filter(tag => tag !== removedTag);
    setTags(updatedTags);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    console.log(e.target);
  };

  const handleInputConfirm = (e) => {
    if (inputValues.color && inputValues.size ) {
      onAddDetail(inputValues);
      setInputValues({ color: '', size: '' });
    }
    e.preventDefault();
  };

  // const handleTagClick = tag => {  
  //   setInputValue(tag);
  //   handleInputConfirm();
  // };
  // useImperativeHandle(ref, () => ({
  //   getTags: () => tags,
  // }));
  return (
    <div>     
     <Input
        type="text"
        size="small"      
        name="size"
        value={inputValues.size}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}     
      />     
       <Input
        type="text"
        size="small"      
        name="color"
        value={inputValues.color}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}  
        onPressEnter={handleInputConfirm}  
      />
    </div>
  );
};

export default TagInput;
