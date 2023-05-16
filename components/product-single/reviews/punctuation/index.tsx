import Rater from 'react-rater';
import {Comment, InputComment, Product} from 'types';
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {insertComment} from "../../../../lib/Comment/API";
import {randomNumberInRange} from "../../../../pages/account";
import Modal from "../../../Modal/Modal";
import QuestionAlerts from "../../../Alert/QuestionAlerts";
import {useRouter} from "next/router";
import {verifyToken} from "../../../../lib/passport";

interface Props {
    reviews: Comment[],
    product: Product,
    setStatusInsert: Dispatch<SetStateAction<number>>

}

const Punctuation = (props: Props) => {
    const [votes, setVotes] = useState<number[]>([]);
    const [isShowAddComment, setIsShowAddComment] = useState(false);
    const [rating, setRating] = useState(0);
    const [valueComment, setValueComment] = useState('');
    const [isOpenAlertLogin, setIsOpenAlertLogin] = useState(false);
    const textError = "Hãy đăng nhập để bình luận?";
    const router = useRouter()
    const [user, setUser] = useState('');
    const [errorComment, setErrorComment] = useState(false);
    const [errorRating, setErrorRating] = useState(false);
    const percentageBar = (count: number) => {
        return (count * 100) / props.reviews.length;
    }
    // @ts-ignore
    const handleRating = ({rating}) => {
        setRating(rating);
        if(rating !== 0){
            setErrorRating(false);
        }

    };

    function nextLogin() {
        router.push('/login').then();
    }

    useEffect(() => {
        let data1 = 0;
        let data2 = 0;
        let data3 = 0;
        let data4 = 0;
        let data5 = 0;
        for (let i = 0; i < props.reviews.length; i++) {
            if (props.reviews[i].rating === 1) {
                data1 += 1;
            }
            if (props.reviews[i].rating === 2) {
                data2 += 1;
            }
            if (props.reviews[i].rating === 3) {
                data3 += 1;
            }
            if (props.reviews[i].rating === 4) {
                data4 += 1;
            }
            if (props.reviews[i].rating === 5) {
                data5 += 1;
            }
        }
        const listVotes = [data1, data2, data3, data4, data5];
        setVotes(listVotes);
    }, [props.reviews])
    useEffect(() => {
        if (localStorage.getItem('accessToken') !== undefined) {
            // const data = getAccessToken().then();
            // setUser(localStorage.getItem('accessToken') +"");
            const token = localStorage.getItem('accessToken');
            console.log("token", token);
            const data = verifyToken(token + "");
            if (data !== undefined)
                setUser(data.user);
            localStorage.setItem("dataDecoded", JSON.stringify(data));
            // console.log(data.user);
        }
    }, [])

    function dataDefaultInputComment(): InputComment {
        const data = {
            comment_input: {
                content: valueComment,
                rating: rating,
                product_id: props.product.id,
            }
        }
        return data;
    }

    async function InsertComment() {
        if (valueComment === '') {
            setErrorComment(true);
            return;
        }
        if (rating === 0) {
            setErrorRating(true);
            return;
        }
        try {
            const res = await insertComment(dataDefaultInputComment())
            if (res.code === 200) {
                console.log('insert comment success');
                props.setStatusInsert(randomNumberInRange(1, 1000));
                setValueComment('');
                setRating(0);
                setErrorComment(false);
                setErrorRating(false);
            }
        } catch (e) {
            console.log('error insert comment')
        }
    }

    function punctuation() {
        let data = 0;
        if (props.reviews.length === 0) {
            return 0;
        }
        for (let i = 0; i < props.reviews.length; i++) {
            data += props.reviews[i].rating;
        }
        const result = data / props.reviews.length;
        return parseFloat(result.toFixed(1));
    }
    function handleError(){
        if(valueComment !== ''){
            setErrorComment(false);
        }
    }

    return <>
        <section className="product-punctuation">
            <div className="product-punctuation__values">
                <h3 >{punctuation()}</h3>
                <Rater total={5} interactive={false} rating={punctuation()}/>
                <p><i className="icon-avatar"></i>{props.reviews.length} all opinions</p>
            </div>

            <div className="product-punctuation__rates">
                <ul className="punctuations-lists">
                    {votes.map((vote, index) => (
                        <li key={index} className="punctuation-item">
                            <Rater total={1} interactive={false} rating={1}/>
                            <span>{index + 1}</span>
                            <div className="punctuation-item__bar">
                                <div style={{width: percentageBar(vote) + '%'}}
                                     className="punctuation-item__bar__current"></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {isShowAddComment ?
                <div className="form-comment punctuation-btn-wrapper">
                    <input type="text" placeholder="Nhập bình luận..." value={valueComment}
                           onChange={(e) => setValueComment(e.target.value)}
                           onBlur={() => {handleError()}}
                    />
                    {errorComment && <div style={{color:"red", fontSize: "14px"}}>Vui lòng nhập bình luận</div>}
                    <Rater total={5} rating={rating} onRate={handleRating}/>
                    {errorRating && <div style={{color:"red", fontSize: "14px"}}>Vui lòng đánh giá</div>}
                    <button type="button" className="btn btn--rounded btn--yellow" onClick={InsertComment}>Bình luận
                    </button>
                </div>
                :
                (user !== '') ?
                    <div className="punctuation-btn-wrapper">
                        <button type="button" className="btn btn--rounded btn--yellow" onClick={() => {
                            setIsShowAddComment(true);
                        }}>Thêm bình luận
                        </button>
                    </div>
                    :
                    <div className="punctuation-btn-wrapper">
                        <button type="button" className="btn btn--rounded btn--yellow" onClick={() => {
                            setIsOpenAlertLogin(true)
                        }}>Thêm bình luận
                        </button>
                    </div>
            }

        </section>
        {isOpenAlertLogin && (
            <Modal>
                <QuestionAlerts textError={textError} setIsOpenQuestionAlert={setIsOpenAlertLogin}
                                setOkListener={nextLogin}/>
            </Modal>
        )}
    </>
};

export default Punctuation;
    