const weddingDate = new Date("2027-01-20T09:00:00+05:30").getTime();

function updateCountdown(){
  const now = Date.now();
  let diff = Math.max(0, weddingDate-now);
  const d = Math.floor(diff/86400000); diff%=86400000;
  const h = Math.floor(diff/3600000); diff%=3600000;
  const m = Math.floor(diff/60000); diff%=60000;
  const s = Math.floor(diff/1000);
  document.getElementById("days").textContent=String(d).padStart(2,"0");
  document.getElementById("hours").textContent=String(h).padStart(2,"0");
  document.getElementById("minutes").textContent=String(m).padStart(2,"0");
  document.getElementById("seconds").textContent=String(s).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const music=document.getElementById("music"), btn=document.getElementById("musicBtn");
btn.addEventListener("click",async()=>{
  if(music.paused){try{await music.play();btn.textContent="❚❚"}catch(e){alert("Add your music file as music.mp3 in this folder, then tap again.")}}
  else{music.pause();btn.textContent="♪"}
});
