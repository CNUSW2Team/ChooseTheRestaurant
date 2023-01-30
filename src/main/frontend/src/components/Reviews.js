import Review from "./Review";

function Reviews(props) {
    return (
        <div>
            {props.reviews && props.reviews.sort((a, b) => (new Date(b.date) - new Date(a.date))).map(v =>
                <Review nickname={v.nickname} date={v.date} stars={v.stars} comment={v.comment}/>)
            }
        </div>
);
}

export default Reviews;

