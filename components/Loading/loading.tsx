import {Dispatch, SetStateAction} from "react";
import Image from "next/image";

export default function Loading() {
    return <>
        <div className="modal-loading">
            <div className="background-loading-modal"></div>
            <div className="inner-loading-modal">
                {/*<div className="icon-error">*/}
                    <Image src="/images/loading.gif" alt="" width={100} height={100} />
                {/*</div>*/}

            </div>
        </div>
    </>
}