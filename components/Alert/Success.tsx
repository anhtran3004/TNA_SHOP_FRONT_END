import Image from "next/image";
interface Props{
    textSuccess: string
}
export default function Success(props: Props){

    return<>
        <div className="error-modal">
            {/*<div className="background-error-modal"></div>*/}
            <div className="inner-success">
                <Image src="/images/home/success.png" alt="" width={25} height={25}/>
                <p>
                    {/*{props.textSuccess}*/}
                    Login success
                </p>
            </div>
        </div>
    </>
}