let allCandidates = [
    {
        name: "Michael Anderson",
        numOfVotes: 1000,
        imgUrl: "man-one.jpg",
        gender: "male"
    },
    {
        name: "Emily Parker",
        numOfVotes: 900,
        imgUrl: "woman-three.jpg",
        gender: "female"
    },
    {
        name: "James Carter",
        numOfVotes: 800,
        imgUrl: "man-nine.jpg",
        gender: "male"
    },
    {
        name: "Olivia Monroe",
        numOfVotes: 700,
        imgUrl: "woman-two.jpg",
        gender: "female"
    },
    {
        name: "Daniel Thompson",
        numOfVotes: 600,
        imgUrl: "man-three.jpg",
        gender: "male"
    },
    {
        name: "Christopher Miller",
        numOfVotes: 400,
        imgUrl: "man-six.jpg",
        gender: "male"
    },
    {
        name: "Brandon Harris",
        numOfVotes: 300,
        imgUrl: "man-five.jpg",
        gender: "male"
    },
    {
        name: "Jessica Bennett",
        numOfVotes: 200,
        imgUrl: "woman-one.jpg",
        gender: "female"
    },
];

const sortedVoters = [...allCandidates].sort((a, b) => b.numOfVotes - a.numOfVotes);

//get number of candidates count
const numCandidates = document.querySelector(".num-of-candidates");
numCandidates.innerText = sortedVoters.length;

const dynamicHTML = sortedVoters
.map(({name, numOfVotes, imgUrl, gender}, index) => {
    return `
                    <div class="candidate-info reveal">
                        <div class="avatar">
                            <img src="vote-images/${imgUrl}" alt="${name} avater" loading="lazy">
                        </div>
                        <div class="info">
                            <p data-key="name">${name}</p>
                            <p data-key="votes"><span>${numOfVotes}</span> votes</p>
                            <p data-key="rank">Rank: <span>${index + 1}</span></p>
                            <div>
                                <button class="vote-btn">Vote</button>
                            </div>
                        </div>
                    </div>
    `
})
.join("");

//get candidates display container
const candidatesCtn = document.getElementById("candidates-ctn");
candidatesCtn.innerHTML = "";
candidatesCtn.innerHTML += dynamicHTML;





//get dom elements
const upcomingElectionPage = document.getElementById("upcoming-election-page");
const ongoingElectionPage = document.getElementById("ongoing-election-page");
const ongoingTxt = document.querySelector(".ongoing-txt");
const upcomingTxt = document.querySelector(".upcoming-txt");
const ongoingCtn = document.getElementById("ongoing");
const upcomingCtn = document.getElementById("upcoming")

//get necessary booleans
let isOnUpcoming = false;
let isOngoing = true;

if (isOngoing) {
    isOnUpcoming = false;
    ongoingTxt.classList.add("active");
    upcomingTxt.classList.remove("active");
    upcomingElectionPage.style.display = "none";
    ongoingElectionPage.style.display = "block"
}
else if (isOnUpcoming) {
    isOngoing = false;
    upcomingTxt.classList.add("active");
    ongoingTxt.classList.remove("active")
    upcomingElectionPage.style.display = "block";
    ongoingElectionPage.style.display = "none"
}

ongoingCtn.addEventListener("click", () => {
    isOnUpcoming = false;
    isOngoing = true;
    ongoingTxt.classList.add("active");
    upcomingTxt.classList.remove("active");
    upcomingElectionPage.style.display = "none";
    ongoingElectionPage.style.display = "block"
})

upcomingCtn.addEventListener("click", () => {
    isOngoing = false;
    isOnUpcoming = true;
    upcomingTxt.classList.add("active");
    ongoingTxt.classList.remove("active")
    upcomingElectionPage.style.display = "block";
    ongoingElectionPage.style.display = "none"
});

//create functionality for buttons

const backToHomeBtn = document.querySelector(".home-btn > button");
const mainHome = document.querySelector("main");
const candidateInfoPage = document.querySelector(".candidate-info-page");

backToHomeBtn.addEventListener("click", () => {
    mainHome.style.display = "block";
    candidateInfoPage.style.display = "none";
});

const voteBtn = candidatesCtn.querySelectorAll(".vote-btn");
const infoPageAvater = document.querySelector(".info-page-avater");
const infoPageData = document.querySelector(".info-page-data");

voteBtn.forEach(btn => {
    btn.addEventListener("click", () => {
    mainHome.style.display = "none";
    candidateInfoPage.style.display = "block";

    const voteCard = btn.closest(".candidate-info");
    if (!voteCard) return;

    const infoDiv = voteCard.querySelector(".info");
    if (!infoDiv) return;

    // get p elements
    const pEls = infoDiv.querySelectorAll("p");

    // inject p data using data-key mapping
    pEls.forEach(p => {
        const key = p.dataset.key;
        const targetP = infoPageData.querySelector(`[data-key="${key}"]`);

        if (targetP) {
        targetP.textContent = p.textContent;
        }
    });

    // get image
    const imgDiv = voteCard.querySelector(".avatar");
    if (!imgDiv) return;

    const img = imgDiv.querySelector("img");
    if (!img) return;

    // replace previous image instead of stacking
    infoPageAvater.innerHTML = "";

    const newImg = document.createElement("img");
    newImg.src = img.src;
    newImg.alt = img.alt;
    newImg.loading = "lazy";

    infoPageAvater.appendChild(newImg);

    });
});


//add slide in animation
const reveals = document.querySelectorAll(".reveal");

// Prevent browser from restoring previous scroll position on page reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    })
}, { thereshold: 0.1 });
reveals.forEach(reveal => observer.observe(reveal));


const btn = document.querySelectorAll("button")
btn.forEach(button => {
    button.addEventListener("pointerdown", () => {
        button.classList.add("pressed");
    })

    button.addEventListener("pointerup", () => {
        button.classList.remove("pressed");
    })
    button.addEventListener("pointerleave", () => {
        button.classList.remove("pressed");
    })

    button.addEventListener("pointercancel", () => {
        button.classList.remove("pressed");
    })
})

//add press down feature to buttons using javascript intersection observer
const bttn = document.querySelectorAll("button")
bttn.forEach(button => {
    button.addEventListener("pointerdown", () => {
        button.classList.add("pressed");
    })

    button.addEventListener("pointerup", () => {
        button.classList.remove("pressed");
    })
    button.addEventListener("pointerleave", () => {
        button.classList.remove("pressed");
    })

    button.addEventListener("pointercancel", () => {
        button.classList.remove("pressed");
    })
});


