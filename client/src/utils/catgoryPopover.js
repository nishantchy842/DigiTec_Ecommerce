import { Button, Popover } from 'antd'
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import useCategory from '../hooks/useCategory';

const CatgoryPopover = () => {
    const [showArrow, setShowArrow] = useState(true);
    const [arrowAtCenter, setArrowAtCenter] = useState(false);
    const mergedArrow = useMemo(() => {
        if (arrowAtCenter)
            return {
                pointAtCenter: true,
            };
        return showArrow;
    }, [showArrow, arrowAtCenter]);
   
    const categories = useCategory()

    return (
        <>
            <Popover placement="bottom" title='Category' content={
                categories.map((item,id) => {
                    return <p 
                    key={id}
                    className='m-1 cursor-pointer hover:bg-fuchsia-200'
                    onClick={(id) => console.log(id.target.innerText)}>{item.name}</p>
                })
            } arrow={mergedArrow}>
                <Button>Categories</Button>
            </Popover>
        </>

    )
}

export default CatgoryPopover
