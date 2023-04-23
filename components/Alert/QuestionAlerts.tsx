import React, {Dispatch, SetStateAction} from "react";
import Image from "next/image";
interface Props {
    textError :string;
    setIsOpenQuestionAlert: Dispatch<SetStateAction<boolean>>;
    setOkListener: () => void;
}
export default function QuestionAlerts(props:Props) {
    return <>
        <div className="error-modal">
            <div className="background-error-modal"></div>
            <div className="inner-error-modal">
                <div className="icon-error">
                    <Image src="/images/home/error-image.png" alt="" width={142} height={100} />
                </div>
                <p className="error-text">{props.textError}</p>
                <div className="action-handle-error">
                    <p onClick={() => props.setIsOpenQuestionAlert(false)}>Hủy bỏ</p>
                    <p onClick={() => {props.setOkListener(); props.setIsOpenQuestionAlert(false)}}>OK</p>
                </div>
            </div>
        </div>
    </>
}