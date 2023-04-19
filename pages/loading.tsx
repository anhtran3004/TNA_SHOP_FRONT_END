import Loading from "../components/Loading/loading";
import Modal from "../components/Modal/Modal";
import Image from "next/image";

export default function LoadingPage(){
    return<>
        {/*<Modal>*/}
        <div className="error-modal">
            <div className="background-error-modal"></div>
            <div className="inner-error-modal">
                <div className="icon-error">
                    <Image src="/images/loading.gif" alt="" width={142} height={100} />
                </div>

            </div>
        </div>
        {/*</Modal>*/}
    </>
}