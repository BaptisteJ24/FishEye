const updateLike = async (like) => {
    const likesTarget = like.target;
    let likeCounterTarget = likesTarget.parentElement.querySelector(".media__likes-number");
    likesTarget.classList.toggle("active");

    let totalLikesText = document.querySelector(".photographer__aside__total-likes-text");
    const totalLikes = totalLikesText.textContent;

    if (likesTarget.classList.contains("active")) {
        totalLikesText.textContent = parseInt(totalLikes) + 1;
        likeCounterTarget.textContent = parseInt(likeCounterTarget.textContent) + 1;
    } else {
        totalLikesText.textContent = parseInt(totalLikes) - 1;
        likeCounterTarget.textContent = parseInt(likeCounterTarget.textContent) - 1;
    }
};

export { updateLike };