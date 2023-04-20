import Image from "next/image";
interface Props{
    textError: string
}
export default function Errors(props: Props){
    return<>
        <div className="error-modal">
            {/*<div className="background-error-modal"></div>*/}
            <div className="inner-success">
                <Image src="/images/home/error.png" alt="" width={25} height={25}/>
                <p>{props.textError}</p>
            </div>
        </div>
    </>
}