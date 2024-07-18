import React, { useState } from 'react';
import { Row, Col, Tag } from 'antd';

const TagComponent = ({dataSize,onDataChanged }) => {  
    const [selectedTags, setSelectedTags] = useState([]);
    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags);
        onDataChanged(nextSelectedTags); 
      };
  
  
    return (
      <Row gutter={[5, 5]} justify="center" style={{ width:"100%" }}>
        {dataSize.map((tag) => (
          <Col key={tag} span={6}>
            <Tag.CheckableTag
             checked={selectedTags.includes(tag)}
             onChange={(checked) => handleChange(tag, checked)}         
              style={{ width: "100%" }}
            >
              {tag}
            </Tag.CheckableTag>
          </Col>
        ))}
      </Row>
    );
  };
  

export default TagComponent;
