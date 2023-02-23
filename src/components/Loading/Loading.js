import React from 'react'
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
export default function Loading() {
    const {isLoading} = useSelector(state => state.QuanLyLoading);
    return isLoading ? (
        <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-10' style={{ backgroundColor: 'rgba(255,255,255,.5)' }}>
            <div>
                <Spin size="large" />
            </div>
        </div>
    ) : null;
}
