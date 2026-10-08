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

/* ===== PERFECT CIRCULAR PROFILE ORBIT ===== */

(function () {
  const visual = document.querySelector(".hero-visual");

  const cards = [
    document.querySelector(".card-top"),
    document.querySelector(".card-bottom")
  ].filter(Boolean);

  const photo = visual?.querySelector(".profile-img");

  if (!visual || !photo || cards.length < 2) return;

  let angle = 0;
  let lastTime = performance.now();

  function animateOrbit(currentTime) {
    const delta = Math.min(currentTime - lastTime, 50);
    lastTime = currentTime;

    // Smooth rotation speed
    angle += delta * 0.00045;

    const visualRect = visual.getBoundingClientRect();
    const photoRect = photo.getBoundingClientRect();

    // Exact profile-photo center relative to the hero visual
    const photoCenterX =
      photoRect.left - visualRect.left + photoRect.width / 2;

    const photoCenterY =
      photoRect.top - visualRect.top + photoRect.height / 2;

    // CSS left:50% / top:50% is the visual's center.
    // Convert the photo center into an offset from that anchor.
    const anchorOffsetX =
      photoCenterX - visualRect.width / 2;

    const anchorOffsetY =
      photoCenterY - visualRect.height / 2;

    // Same radius on X and Y = true circle.
    // Keep the cards just outside the profile rings.
    const radius = Math.min(
      photoRect.width / 2 + 135,
      225
    );

    cards.forEach((card, index) => {
      // Keep cards 180° apart.
      const orbitAngle =
        angle + (index === 0 ? 0 : Math.PI);

      const x = Math.cos(orbitAngle) * radius;
      const y = Math.sin(orbitAngle) * radius;

      card.style.setProperty(
        "transform",
        `translate(
          calc(-50% + ${anchorOffsetX + x}px),
          calc(-50% + ${anchorOffsetY + y}px)
        )`,
        "important"
      );
    });

    requestAnimationFrame(animateOrbit);
  }

  requestAnimationFrame(animateOrbit);
})();
