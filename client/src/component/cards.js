import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const Cards = () => {
    const details = useSelector(state=>state.products)
    console.log(details)
    return (
        <Card
            style={{
                width: 300,
            }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                title={details.title}
                description="This is the description"
            />
        </Card>
    )
};
export default Cards;