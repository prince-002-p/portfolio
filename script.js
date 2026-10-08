const navToggle=document.getElementById("navToggle"),navLinks=document.getElementById("navLinks");
navToggle?.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");navToggle.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const phrases=["building useful things","learning by shipping","turning ideas into projects","debugging my way forward"];
let pi=0,ci=0,deleting=false;
const typed=document.getElementById("typedRole");
function typeLoop(){if(!typed)return;const word=phrases[pi];typed.textContent=deleting?word.slice(0,ci--):word.slice(0,ci++);if(!deleting&&ci>word.length+5)deleting=true;if(deleting&&ci<0){deleting=false;ci=0;pi=(pi+1)%phrases.length}setTimeout(typeLoop,deleting?45:80)}typeLoop();

const filters=document.querySelectorAll(".filter"),cards=document.querySelectorAll(".project-card");
filters.forEach(btn=>btn.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));btn.classList.add("active");const f=btn.dataset.filter;cards.forEach(card=>card.classList.toggle("hidden",f!=="all"&&!card.dataset.category.split(" ").includes(f)))}));

const overlay=document.getElementById("commandOverlay"),input=document.getElementById("cmdInput");
function openCmd(){overlay.classList.add("open");input.value="";input.focus()}
function closeCmd(){overlay.classList.remove("open")}
document.getElementById("cmdOpen")?.addEventListener("click",openCmd);document.getElementById("cmdClose")?.addEventListener("click",closeCmd);
overlay?.addEventListener("click",e=>{if(e.target===overlay)closeCmd()});
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>{closeCmd();document.querySelector(b.dataset.go)?.scrollIntoView({behavior:"smooth"})}));
input?.addEventListener("input",()=>{const q=input.value.toLowerCase();document.querySelectorAll(".command-items button").forEach(b=>b.style.display=b.textContent.toLowerCase().includes(q)?"flex":"none")});
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openCmd()}if(e.key==="Escape")closeCmd()});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("revealed")}),{threshold:.12});
document.querySelectorAll(".section,.project-card,.skill-card,.timeline-item").forEach(x=>{x.classList.add("reveal");observer.observe(x)});

/* ===== PROFILE CARD ORBIT ===== */

(function () {
  const visual = document.querySelector(".hero-visual");

  const cards = [
    document.querySelector(".card-top"),
    document.querySelector(".card-bottom")
  ].filter(Boolean);

  if (!visual || cards.length < 2) return;

  let angle = 0;
  let lastTime = performance.now();

  function animateOrbit(currentTime) {
    const delta = Math.min(currentTime - lastTime, 50);
    lastTime = currentTime;

    // Orbit speed
    angle += delta * 0.00045;

    // Distance from profile photo
    const radius = Math.min(
      210,
      Math.max(160, visual.clientWidth * 0.28)
    );

    cards.forEach((card, index) => {
      // Keep the two cards opposite each other
      const orbitAngle =
        angle + (index === 0 ? 0 : Math.PI);

      const x = Math.cos(orbitAngle) * radius;
      const y = Math.sin(orbitAngle) * radius;

      card.style.setProperty(
        "transform",
        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        "important"
      );
    });

    requestAnimationFrame(animateOrbit);
  }

  requestAnimationFrame(animateOrbit);
})();
