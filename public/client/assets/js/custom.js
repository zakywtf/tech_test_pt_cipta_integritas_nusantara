// Ganti nomor WhatsApp berikut dengan nomor kamu
const NOMOR_WHATSAPP = "62818999771"; //Pastikan nomor diawali dengan kode negara tanpa tanda "+" (cth. 085-XXX-XXX-XXX diubah mendaji 6285-XXX-XXX-XXX)

const ewc_hidden = document.querySelectorAll(".ewc_hidden");
const ewc_button = document.querySelectorAll(".ewc_button");
const ewc_audio = new Audio(
  "https://res.cloudinary.com/xviidev/video/upload/v1642074623/whatsapp-web_tqjtgm.mp3"
);

const ewcShow = () => {
  ewc_hidden.forEach((el) => {
    el.style.display = "flex";
    el.ariaHidden = "false";
  });
  ewc_audio.play();

  setTimeout(() => {
    ewc_hidden.forEach((el) => {
      el.style.opacity = "1";
    });
  }, 0);

  setTimeout(() => {
    document.getElementById("ewChatBubble").style.opacity = "1";
  }, 300);
};

const ewcHide = () => {
  ewc_hidden.forEach((el) => {
    el.style.opacity = "0";
    document.getElementById("ewChatBubble").style.opacity = "0";
    el.ariaHidden = "true";
  });

  setTimeout(() => {
    ewc_hidden.forEach((el) => {
      el.style.display = "none";
    });
  }, 1000);
};

function ewcOpen() {
  if (ewChatBox.style.display == "none") {
    ewcShow();
  } else {
    ewcHide();
  }
}

document.querySelectorAll(".ewc_close").forEach((el) => {
  el.addEventListener("click", ewcHide);
});

document.querySelectorAll(".ewc_open").forEach((el) => {
  el.addEventListener("click", ewcOpen);
});

document.getElementById("ewc_send").addEventListener("click", () => {
  window.open(
    `https://wa.me/${NOMOR_WHATSAPP}?text=${encodeURI(
      document.getElementById("ewc_message").value
    )}`
  );
});