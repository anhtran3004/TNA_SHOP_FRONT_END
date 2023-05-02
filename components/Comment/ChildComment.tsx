import createMarkup from "../../utils/markup";
import {useEffect, useState} from "react";
import {getChildComment} from "../../lib/Comment/API";
import {ChildComments} from "../../types";

interface Props{
    commentId: number
}
export default function ChildComponent(props: Props){
    const [listChildComment,  setListChildComment] = useState<ChildComments[]>([])
    useEffect(() => {
        async function fetchListChildCategory() {
            try {
                const res = await getChildComment(props.commentId);
                if(res.code === 200){
                    setListChildComment(res.data);
                }
            } catch (e) {
                console.log('Error fetch list child category')
            }
        }
        fetchListChildCategory().then();
    }, [props.commentId])
    return<>
        {listChildComment.map((comment, index) =>(
            <div className="child-comment review-item" style={{marginLeft: "30px", marginBottom: "30px"}} key={index}>
                <div className="review__avatar">
                    <img src="/images/products/admin.webp" alt="avatar"/>
                </div>
                <div className="review__content">
                    <h3>Admin</h3>
                    <div className="review__comment" dangerouslySetInnerHTML={createMarkup(comment.content)}>
                    </div>
                </div>
            </div>
        ))}

    </>
}