import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {updateReasonOrder} from "../../lib/Order/API";

interface Props {
    setIsOpenReason: Dispatch<SetStateAction<boolean>>
    setIsOpenSuccess: Dispatch<SetStateAction<boolean>>
    setTextSuccess: Dispatch<SetStateAction<string>>
    setIsOpenError: Dispatch<SetStateAction<boolean>>
    setTextError: Dispatch<SetStateAction<string>>
    changeStatus: (id: number, status: number) => void
    orderId: number
}
export default function ReasonRemove(props: Props) {
    const [valueReason, setValueReason] = useState('')
    async function UpdateReasonOrder(){
        try{
            const res = await updateReasonOrder(props.orderId, valueReason);
            if(res.code === 200){
                console.log('add reason success!');
                props.changeStatus(props.orderId, 3)
            }
        }catch (e) {
            console.log('error', e)
        }
    }
    return <>
        <div className="error-modal">
            <div className="background-error-modal" onClick={() => props.setIsOpenReason(false)}></div>
            <div className="inner-error-modal" style={{width: "500px"}}>
                <div className="update-category">
                    <h2 className="title-reason">Lý do hủy đơn:</h2>
                    <div className="input-product" style={{width: "300px"}}>
                        <label htmlFor="priority">Lý do hủy đơn:</label>
                        <input
                            className="shadow-gray-400 border-2"
                            type="text"
                            id="priority"
                            name="priority"
                            value={valueReason}
                            onChange={(e) => setValueReason(e.target.value)}
                        />
                    </div>
                    <button onClick={() => props.setIsOpenReason(false)}
                            className="cancel-button">Hủy bỏ
                    </button>
                    <button onClick={() => {UpdateReasonOrder().then(() => props.setIsOpenReason(false))}}
                            className="confirm-button"
                            >Xác nhận
                    </button>
                </div>
            </div>
        </div>

    </>
}