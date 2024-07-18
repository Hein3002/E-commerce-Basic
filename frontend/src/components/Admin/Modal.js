import React, { useRef, useState } from 'react';
import { Button, Modal, notification, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import TagInput from './Input';
import TagComponent from './ChooseSize';

const ModalUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const tagInputRef = useRef();
    const [selectedTagsData, setSelectedTagsData] = useState([]);
    const [tagSize, setTagSize] = useState([])
    const handleTagDataChanged = (tags) => {
        setSelectedTagsData(tags);
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 5 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const formData = new FormData();                
        form
            .validateFields()
            .then((values) => {                
               Object.keys(values).forEach((el)=>{
                formData.append(el,values[el])                
                    if(Array.isArray(values[el])){
                        values[el].map((e)=>{
                            formData.append('color[]',e.color)
                        })
                    }
               })
               if(selectedTagsData){
                selectedTagsData.map((el,index)=>{
                    console.log(el)
                })               
               }
           })      
            .catch((errorInfo) => {         
                console.log("Validation failed:", errorInfo);
            });
    
        // form.submit(); // Bạn không cần gọi hàm này nữa
    };
    

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // const onFinish = (values) => {        
    //     // const updatedDetails = values.details.map((detail, index) => {           
    //     //     return { ...detail, size: selectedTagsData[index] };
    //     // });
    //     // form.setFieldsValue({ details: updatedDetails }); 
       
    //     // setIsModalOpen(false);
    //     // setTagSize([])
    // };


    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Notification Title',
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    };

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <>
            {contextHolder}
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>

            <Modal
                title="Product Information"
                open={isModalOpen}
                cancelText={"Cancel"}
                okText={"Save"}
                width={"60vw"}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(child) => {
                    return (
                        <>
                            <hr
                                style={{
                                    color: "#F8F3F3",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                                {child}
                            </div>
                        </>
                    );
                }}
            >
                <Form
                    {...formItemLayout}
                    form={form}                   
                    initialValues={{
                        residence: ["zhejiang", "hangzhou", "xihu"],
                        prefix: "86",
                    }}
                    style={{ maxWidth: "100%" }}
                    scrollToFirstError
                >



                    <Form.Item label="Tags" name="tags">
                        <TagInput
                            onAddDetail={
                                (value) => form.setFieldsValue({ details: [...form.getFieldValue('details') || [], { color: value.color, size: setTagSize([...tagSize, value.size]), quantity: "" }] })
                            } />
                    </Form.Item>

                    <Form.List name="details">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', width: "100%", justifyContent: "center" }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'color']}
                                            rules={[{ required: true, message: 'Color cannot be left blank!' }]}
                                            style={{ width: '200px' }}
                                        >
                                            <Input placeholder="Color" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'size']}
                                            style={{ width: '300px' }}
                                        >
                                            <TagComponent dataSize={tagSize} onDataChanged={handleTagDataChanged} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quantity']}
                                            rules={[{ required: true, message: 'Quantity cannot be left blank!' }]}
                                            style={{ width: '200px' }}
                                        >
                                            <Input type="number" placeholder="Quantity" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                {/* <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ marginLeft: 180 }}>
                                        Add details
                                    </Button>
                                </Form.Item> */}
                            </>
                        )}
                    </Form.List>




                </Form>
            </Modal>
        </>
    );
};

export default ModalUser;
