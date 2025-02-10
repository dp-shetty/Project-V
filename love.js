const heartEmojis = [
  "💖",
  "💘",
  "💝",
  "💞",
  "💕",
  "💓",
  "💗",
  "💙",
  "💜",
  "💚",
  "🧡",
  "💛",
  "❤️",
  "🩷",
  "🩵",
  "💋",
  "😍",
  "😘",
  "🌹",
  "🥰",
  "💃",
  "✨",
  "🎶",
];
const qacontainer = document.getElementById("qa-container")
let collectedAnswers = JSON.parse(localStorage.getItem("collectedAnswers")) || [];
let loveMusic = new Audio("./assets/Janam-Janam.mp3");
let heartInterval, timerInterval;
let timeLeft = 60; // Reset timer when popup opens

// 🎶 Play love song
function playLoveMusic() {
  loveMusic.volume = 0.7;
  loveMusic.loop = true;
  loveMusic.play().catch((error) => console.log("Autoplay blocked:", error));
}

// 🎵 Stop music when popup closes
function stopLoveMusic() {
  loveMusic.pause();
  loveMusic.currentTime = 0;
}

// 💌 Send email and start effects
function sendLoveEmail() {
  fetch("https://project-v-backend-tau.vercel.app/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.text())
    .then((data) => {
      showLoveToast();
      startFloatingHearts();
    })
    .catch((error) => {
      showSadToast();
      startFloatingHearts("💔");
    });
}

// 💓 Countdown heart timer
function getHeartTimer(seconds) {
  let hearts = "";
  for (let i = 0; i < Math.ceil(seconds / 4); i++) {
    hearts += heartEmojis[i % heartEmojis.length] + " ";
  }
  return hearts.trim();
}

// 💘 Show Love Popup
function showLoveToast() {
  timeLeft = 60; // Reset timer
  Swal.fire({
    title: "💌 Special Delivery for My Nikku! 💖",
    html: `
            <p class="text-lg font-semibold">A love letter just landed in your Mail inbox! 💘</p>
            <p class="text-pink-600 font-medium mt-2">But wait... do you feel that? 💓</p>
            <p class="text-pink-500 italic">Your heart is racing, isn’t it? 😘</p>
            <div class="mt-4 animate-bounce text-3xl">💞💃✨</div>
            <p class="mt-3 text-gray-500">(Go check it before Cupid steals it! 😉)</p>
            <p class="mt-4 text-xl font-bold text-red-600">
                ⏳ <span id="loveTimer">💖💘💝💞💓</span>
            </p>
        `,
    showConfirmButton: false,
    timer: 60000,
    background: "rgba(255, 240, 246, 0.95)",
    color: "#d6336c",
    position: "center",
    backdrop: `rgba(0,0,0,0.5)`,
    allowOutsideClick: false,
    didOpen: () => {
      playLoveMusic();
      startFloatingHearts();
      // goIn()
      const timerElem = document.getElementById("loveTimer");
      timerInterval = setInterval(() => {
        timeLeft--;
        timerElem.innerHTML = `⏳ ${timeLeft}s ${getHeartTimer(timeLeft)}`;
        if (timeLeft <= 0) clearInterval(timerInterval);
      }, 1000);
    },
    willClose: () => {
      stopLoveMusic();
      stopFloatingHearts();
      clearInterval(timerInterval);
      showLoveLoader();
      // goIn()
    },
  });
}

// 💔 Show Failed Toast
function showSadToast() {
  Swal.fire({
    title: "💔 Oops! Love Delivery Failed!",
    text: "The love letter couldn't be sent... Maybe try again? 😢",
    icon: "error",
    background: "#2b2b2b",
    color: "#ff4d4d",
    showConfirmButton: false,
    timer: 3000,
    toast: true,
    position: "top-end",
  });
}

// 💗 Start Floating Hearts
function startFloatingHearts(emoji = "💖") {
  stopFloatingHearts(); // Prevent duplicates
  heartInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(heartInterval);
      return;
    }

    let heart = document.createElement("div");
    heart.innerHTML =
      heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.classList.add("floating-heart");

    // Random position
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.bottom = `-10px`;

    // Random size (30px - 80px)
    let size = Math.random() * 50 + 30;
    heart.style.fontSize = `${size}px`;

    // Random animation duration (2s - 4s)
    let duration = Math.random() * 2 + 2;
    heart.style.animationDuration = `${duration}s`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = "scale(2.5)"; // Bigger Growth
      heart.style.opacity = "0";
    }, duration * 800);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }, 3000);
}

// 💞 Stop Floating Hearts
function stopFloatingHearts() {
  clearInterval(heartInterval);
}

function showLoveLoader() {
  const loader = document.getElementById("loveLoader");
  const messageElem = document.getElementById("loveMessage");

  const messages = [
    "💘 Downloading love... Please wait. Your heart deserves premium speed! 💖",
    "💋 Patience, my love... Cupid is buffering your next surprise! 🏹✨",
    "💞 Summoning all my love for you... Please stay adorable while waiting! 😘",
    "💓 My heart is loading... It’s taking extra time because you're too special! 💃🔥",
    "💖 You, me, and 10 seconds of love magic... Worth the wait, right? 😍",
    "💌 Love.exe is running... Don’t close the tab, or I’ll cry. 😂❤️",
    "💜 Your love is processing... Too much cuteness detected, slowing things down! 🥰",
    "🌹 This is not just a loader, it's a proof that I’m hopelessly in love! 😘",
    "💗 Hold on, love... If loading screens were kisses, you'd be drowning by now! 😘💋",
    "😍 Preparing a surprise... Your smile is all I need to function! 💖",
  ];
  let timeLeft = 20; // 20 seconds
  let messageInterval;

  function updateMessage() {
    if (timeLeft <= 0) return clearInterval(messageInterval); // Stop at 0 seconds
    messageElem.innerHTML =
      messages[Math.floor(Math.random() * messages.length)];
  }

  messageElem.innerHTML = messages[Math.floor(Math.random() * messages.length)];

  loader.style.opacity = "1";
  loader.style.visibility = "visible";
  loader.style.transform = "scale(1)";

  createFloatingHearts(); // Start heart animation

  updateMessage(); // First message immediately
  messageInterval = setInterval(updateMessage, 2000); // Update every 2 seconds

  setTimeout(() => {
    clearInterval(messageInterval); // Stop updating messages
    loader.style.opacity = "0";
    loader.style.transform = "scale(0.9)";
    setTimeout(() => {
      loader.style.visibility = "hidden";
    }, 1000);
    const loveForm = document.getElementById("loveForm");
    loveForm.style.display = "none";
    showNextQuestion();
    // initializeMediaAfterLoader();
  }, 20000); // Show for 20 seconds
  
}

/* 💖 Create Floating Hearts */
function createFloatingHearts() {
  const loader = document.getElementById("loveLoader");

  for (let i = 0; i < 10; i++) {
    let heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.classList.add("floating-heart");

    // Random position
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${Math.random() * 100}vh`;
    heart.style.fontSize = `${Math.random() * 20 + 20}px`;

    loader.appendChild(heart);

    setTimeout(() => {
      heart.remove(); // Remove hearts after animation
    }, 3000);
  }
}

let media = [
    {
      id:1,
      src: "./assets/nikku/1.webp",
      type: "image",
      desc: "Your beautiful smile makes my heart race. 💖",
    },
    {
        id:2,
      src: "./assets/nikku/2.webp",
      type: "image",
      desc: "Those eyes… I get lost in them every time. 😘",
    },
    {
        id:3,
      src: "./assets/nikku/3.webp",
      type: "image",
      desc: "Every moment with you is a dream come true. 🥰",
    },
    {
        id:4,
      src: "./assets/nikku/4.webp",
      type: "image",
      desc: "The way you laugh… pure magic. 🎶",
    },
    {
        id:5,
      src: "./assets/nikku/5.webp",
      type: "image",
      desc: "Every second with you feels like heaven. 💞",
    },
    {
        id:6,
        src: "./assets/nikku/6.webp",
        type: "image",
        desc: "Your beautiful smile makes my heart race. 💖",
      },
      {
        id:7,
        src: "./assets/nikku/7.webp",
        type: "image",
        desc: "Those eyes… I get lost in them every time. 😘",
      },
      {
        id:8,
        src: "./assets/nikku/8.webp",
        type: "image",
        desc: "Every moment with you is a dream come true. 🥰",
      },
      {
        id:9,
        src: "./assets/nikku/9.webp",
        type: "image",
        desc: "The way you laugh… pure magic. 🎶",
      },
      {
        id:10,
        src: "./assets/nikku/10.webp",
        type: "image",
        desc: "Every second with you feels like heaven. 💞",
      },
      {
        id:11,
        src: "./assets/nikku/11.webp",
        type: "image",
        desc: "Your beautiful smile makes my heart race. 💖",
      },
      {
        id:12,
        src: "./assets/nikku/12.webp",
        type: "image",
        desc: "Those eyes… I get lost in them every time. 😘",
      },
      {
        id:13,
        src: "./assets/nikku/13.webp",
        type: "image",
        desc: "Every moment with you is a dream come true. 🥰",
      },
      {
        id:14,
        src: "./assets/nikku/14.webp",
        type: "image",
        desc: "The way you laugh… pure magic. 🎶",
      },
      {
        id:15,
        src: "./assets/nikku/15.webp",
        type: "image",
        desc: "Every second with you feels like heaven. 💞",
      },
      {
        id:116,
        src: "./assets/nikku/16.webp",
        type: "image",
        desc: "Your beautiful smile makes my heart race. 💖",
      },
      {
        id:17,
        src: "./assets/nikku/17.webp",
        type: "image",
        desc: "Those eyes… I get lost in them every time. 😘",
      },
      {
        id:18,
        src: "./assets/nikku/18.webp",
        type: "image",
        desc: "Every moment with you is a dream come true. 🥰",
      },
      {
        id:19,
        src: "./assets/nikku/19.webp",
        type: "image",
        desc: "The way you laugh… pure magic. 🎶",
      },
      {
        id:20,
        src: "./assets/nikku/20.webp",
        type: "image",
        desc: "Every second with you feels like heaven. 💞",
      },
      {
        id:21,
        src: "./assets/nikku/21.webp",
        type: "image",
        desc: "Your beautiful smile makes my heart race. 💖",
      },
      {
        id:22,
        src: "./assets/nikku/22.webp",
        type: "image",
        desc: "Those eyes… I get lost in them every time. 😘",
      },
      {
        id:23,
        src: "./assets/nikku/23.webp",
        type: "image",
        desc: "Every moment with you is a dream come true. 🥰",
      },
      {
        id:24,
        src: "./assets/nikku/24.webp",
        type: "image",
        desc: "The way you laugh… pure magic. 🎶",
      },
      {
        id:25,
        src: "./assets/nikku/25.webp",
        type: "image",
        desc: "Every second with you feels like heaven. 💞",
      },
      {
        id:26,
        src: "./assets/nikku/26.webp",
        type: "image",
        desc: "Your beautiful smile makes my heart race. 💖",
      },
      {
        id:27,
        src: "./assets/nikku/27.webp",
        type: "image",
        desc: "Those eyes… I get lost in them every time. 😘",
      },
      {
        id:28,
        src: "./assets/nikku/28.webp",
        type: "image",
        desc: "Every moment with you is a dream come true. 🥰",
      },
      {
        id:29,
        src: "./assets/nikku/29.webp",
        type: "image",
        desc: "The way you laugh… pure magic. 🎶",
      },
      {
        id:30,
        src: "./assets/nikku/30.webp",
        type: "image",
        desc: "Every second with you feels like heaven. 💞",
      },
      {
        id:31,
        src: "./assets/nikku/31.webp",
        type: "image",
        desc: "Your beautiful smile makes my heart race. 💖",
      },
      {
        id:32,
        src: "./assets/nikku/32.webp",
        type: "image",
        desc: "Those eyes… I get lost in them every time. 😘",
      },
      {
        id:33,
        src: "./assets/nikku/33.webp",
        type: "image",
        desc: "Every moment with you is a dream come true. 🥰",
      },
      {
        id:34,
        src: "./assets/nikku/34.mp4",
        type: "video",
        desc: "The way you laugh… pure magic. 🎶",
      },
      {
        id:35,
        src: "./assets/nikku/35.mp4",
        type: "video",
        desc: "Every second with you feels like heaven. 💞",
      },
  ];

function initializeMediaAfterLoader () {
  qacontainer.style.display='none'
    const mediaContainer = document.getElementById("mediaContainer");
    const loveLoader = document.getElementById("loveLoader");
    const loveForm = document.getElementById("loveForm");

  function createMediaElements() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;
    media.forEach((item, index) => {
        let element;
        if (item.type === "image") {
            element = document.createElement("img");
            element.src = item.src;
        } else if (item.type === "video") {
            element = document.createElement("video");
            element.src = item.src;
            element.autoplay = true;
            element.loop = true;
            element.muted = true;
        }
        element.classList.add("media-item");
        mediaContainer.appendChild(element);
    });
}

function spinAndScatterMedia() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    document.querySelectorAll(".media-item").forEach((media, index) => {
        // First, apply spinning animation
        media.style.opacity = 1;
        media.style.transition = "transform 3s ease-in-out";
        media.style.transform += " rotate(720deg) scale(1)";

        // After spinning, scatter them randomly
        setTimeout(() => {
            const randomRotation = Math.random() * 360;
            media.style.transform = `rotate(${randomRotation}deg)`;
        }, 3000);
    });
    setTimeout(selectRandomMedia, 4000);
}

function selectRandomMedia() {
    const mediaItems = document.querySelectorAll(".media-item");
    const selectedMedia = mediaItems[Math.floor(Math.random() * mediaItems.length)];
    const isImage = selectedMedia.tagName === "IMG";
    const isVideo = selectedMedia.tagName === "VIDEO";
    console.log("isVideo",selectedMedia.tagName === "VIDEO")
    // console.log("isImage",selectedMedia)
    // let video = document.querySelector('video')
    function extractNumberFromPath(path) {
        const match = path.match(/(\d+)(?=\.\w+$)/);
        return match ? match[0] : null;
    }
    let id = extractNumberFromPath(selectedMedia.src)
    let description = media[id-1].desc
    let single = document.getElementById('single')
    let desc = document.getElementById('desc')
    let next = document.getElementById("butt");
    let theimg = document.getElementById("theimg");
    let thevid = document.getElementById('thevid')

    setTimeout(() => {
      if(isVideo){
        thevid.style.display='block'
        theimg.style.display='none'
        thevid.src = selectedMedia.src
        thevid.autoplay = true;
        thevid.loop = true;
        thevid.muted = false;
      }else{
        thevid.style.display='none'
        theimg.style.display='block'
        theimg.src = selectedMedia.src
        thevid.autoplay = true;
        thevid.loop = true;
        thevid.muted = true;
      }

    //  video ? video.src = selectedMedia.src : ''
     desc.append(description)
  }, 1000);
    
    document.body.style.background = "rgba(0, 0, 0, 0.5)";
    mediaItems.forEach(item => item.style.opacity = 0.3);
    selectedMedia.style.opacity = 1;
    selectedMedia.style.transform = "scale(1) rotate(0deg)";
    selectedMedia.style.transition = "transform 0s ease-in-out";
    selectedMedia.style.marginLeft = 'auto'
    selectedMedia.style.marginTop = '0rem'

    next.onclick = () => {
      desc.innerText=''
        mediaItems.forEach(item => item.style.opacity = 1);
        spinAndScatterMedia();
        next.style.display='flex'
    };
    
    // single.prepend(selectedMedia);
    // desc.append(description)
    next.style.display='flex'
    single.style.display='flex'
    desc.style.display='flex'
}

setTimeout(() => {
    loveLoader.style.display = "none";
    loveForm.style.display = "none";
    createMediaElements();
    setTimeout(spinAndScatterMedia, 100); // Small delay before animation starts
}, 3000); // Assuming loader takes 3 seconds
};


const questions = [
  "Describe your dream partner—but be careful, I might take notes. 😉",
  "What’s something small that instantly makes you happy? Asking for… me. 💖",
  "If love had a taste, what would it be? (Please don’t say ‘bitter’ 😅)",
  "What’s the one thing you’d steal from your ideal relationship? (Besides my heart, obviously.)",
  "If I promised to grant one wish (but it must involve me), what would you wish for? 🎁",
  "Would you rather have a love that burns bright but fades fast, or a slow-growing love that lasts forever? (Hint: Choose wisely 😉)",
  "What’s the cutest thing a partner could do that would completely melt you? Asking for science, of course. 🤓",
  "If love was a playlist, what song would describe your ideal romance? And why do I feel like I’d be in every verse? 🎶",
  "What’s the most unexpected thing that could make you fall for someone? Just wondering if I should start practicing. 😏",
  "Describe a perfect date in 5 words. And let’s see if I can make it happen. 😉",
  "What’s the most ridiculous yet romantic thing someone could do to win your heart? (Totally not asking for personal reasons. 😏)",
  "If you had to describe love as a weather forecast, what would it be? (And should I bring an umbrella or sunglasses? ☔😎)",
  "What’s one thing your future partner absolutely MUST do? (Because I need to update my to-do list. 😉)",
  "If we were in a movie, what genre would our love story be? (Hoping it’s not a horror. 😅)",
  "Imagine waking up to the perfect good morning text… what does it say? (Let me practice my texting skills. 📱💖)"
];

let questionIndex = 0;
// const qacontainer = document.getElementById("qa-container")
const questionElement = document.getElementById("qa-question");
const answerInput = document.getElementById("qa-answer");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");

function showNextQuestion() {
  questionElement.textContent = questions[questionIndex];
  qacontainer.style.display='block'
  if (answerInput.value.trim() === "" && questionIndex!=0) {
    Swal.fire({
      icon: "warning",
      title: "No honey, you cannot skip! 💔",
      text: "You have to answer before moving to the next question!"
    });
    return;
  }

  const question = questionElement.textContent;
  const answer = answerInput.value;
  
  collectedAnswers.push({
    question,
    answer
  });

  localStorage.setItem("collectedAnswers", JSON.stringify(collectedAnswers));

  if (questionIndex < questions.length - 1) {
    questionIndex++;
    questionElement.textContent = questions[questionIndex];
    answerInput.value = ""; // Clear input field
  } else {
    // Last question reached, enable submit and disable next button
    nextButton.disabled = true;
    submitButton.disabled = false;
  }
}

function submitAnswer() {
  if (answerInput.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Please enter your answer before submitting!"
    });
    return;
  }

  // const question = questionElement.textContent;
  // const answer = answerInput.value;
  
  // collectedAnswers.push({
  //   question,
  //   answer
  // });

  // localStorage.setItem("collectedAnswers", JSON.stringify(collectedAnswers));

  // Send answer to backend
  fetch("https://project-v-backend-tau.vercel.app/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: collectedAnswers })
  })
  .then(response => response.text())
  .then(data => {
    Swal.fire({
      title: "💌 Your answer has been submitted successfully to my Heart!! 💖",
      html: `
              <p class="text-lg font-semibold">Thank you for your valuable time and answers nikku mari! 💘</p>
              <p class="text-pink-600 font-medium mt-2">These inputs will always be etched in my memories 💓</p>
          `,
      showConfirmButton: false,
      timer: 10000,
      background: "rgba(255, 240, 246, 0.95)",
      color: "#d6336c",
      position: "center",
      backdrop: `rgba(0,0,0,0.5)`,
      allowOutsideClick: false,
      didOpen: () => {
        startFloatingHearts();
      },
      willClose: () => {
        setTimeout(()=>{
          showValentineProposal();
        },5000)
      },
    });
  })
  .catch(error => {
    console.error("Error submitting answer:", error);
    Swal.fire({
      icon: "error",
      title: "Submission Failed",
      text: "Failed to submit answer. Please try again."
    });
  });
}

function showValentineProposal() {
  document.getElementById("qa-container").innerHTML = `
    <h2 class='text-2xl font-bold text-white mb-4'>💖 Can You Be My Valentine? 💝</h2>
    <input type='text' value='Of course, my love! 💞' disabled class='w-full text-center p-3 rounded-lg bg-white/30 border border-white/50 text-pink-600 font-semibold'/>
    <div class='flex gap-4 mt-4'>
      <button id='yes-btn' class='bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-semibold shadow-lg'>Yes 💘</button>
      <button id='no-btn' class='bg-red-500 text-white py-2 px-6 rounded-lg font-semibold shadow-lg absolute'>No 💔</button>
    </div>
  `;

  document.getElementById("no-btn").addEventListener("mouseover", moveNoButton);
  document.getElementById("no-btn").addEventListener("click", showNoMessage);
  document.getElementById("yes-btn").addEventListener("click", () => {
    fetch("https://project-v-backend-tau.vercel.app/accepted", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(()=>{
      Swal.fire({ title: "Yay! I knew it! 💖" ,
        didOpen: () => {
          startFloatingHearts();
        },
        willClose: () => {
            initializeMediaAfterLoader();
        },
      });
    });
      
    })
}

function moveNoButton() {
  const x = Math.random() * window.innerWidth * 0.7;
  const y = Math.random() * window.innerHeight * 0.7;
  this.style.transform = `translate(${x}px, ${y}px)`;
}

function showNoMessage() {
  const messages = [
    "Oh no, that hurts! But I won’t give up on us! 💔",
    "Are you sure? I already booked our imaginary honeymoon! 😜",
    "Even gravity can't pull me away from you, but your 'No' might! 😭",
    "Fine, but who else will send you daily 'I love you' texts? 📱💖",
    "My heart is buffering… please switch to 'Yes' mode! 💕"
  ];
  Swal.fire({
    icon: "info",
    title: messages[Math.floor(Math.random() * messages.length)]
  });
}


  
