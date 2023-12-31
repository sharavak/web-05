import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from "react";
import './BookmarkIcon.css';
const PostArticle = (props) => {

    let email = JSON.parse(localStorage.getItem('user-info'));
    //console.log(email);
    const [isBookmarked, setBookmarked] = useState(props.checked);

    async function postArticles(e) {
        setBookmarked(!isBookmarked);
        let res;
        if (!isBookmarked) {
            toast.success("Successfully bookmarked", {
                position: toast.POSITION.TOP_CENTER,
                toastId: "customId"
            })
            res = await fetch('https://news-api-nine-iota.vercel.app/api/users/articles', {
                method: 'POST',
                body: JSON.stringify({ ...props, email: email.email }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

        } else {
            setBookmarked(!isBookmarked);
            const json = { email: email.email, title: props.title }
            res = await fetch('https://news-api-nine-iota.vercel.app/api/users/articles', {
                method: 'DELETE',
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            toast.success("Successfully removed!!!", {
                position: toast.POSITION.TOP_CENTER,
                toastId: "customId2"
            })

        }
        //res = await res.json();
    }
    return (
        <div className={`bookmark ${isBookmarked ? 'bookmarked' : ''}`} onClick={postArticles}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                {/* Outline of the bookmark */}
                <path
                    d="M17 2H7C5.9 2 5 2.9 5 4V20L12 17L19 20V4C19 2.9 18.1 2 17 2ZM17 18L12 15.82L7 18V4H17V18Z"
                />
                {/* Inside of the bookmark */}
                {isBookmarked && (
                    <path
                        d="M17 2H7C5.9 2 5 2.9 5 4V20L12 17L19 20V4C19 2.9 18.1 2 17 2ZM15 8C15 7.45 14.55 7 14 7H10C9.45 7 9 7.45 9 8V16C9 16.55 9.45 17 10 17H14C14.55 17 15 16.55 15 16V8Z"
                        fill="#021f36" />
                )}
            </svg>
        </div>
    );
};

export default PostArticle