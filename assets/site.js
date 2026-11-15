(function () {
  var bar = document.getElementById("callbar") || document.querySelector(".callbar");
  if (!bar) return;
  var next = document.getElementById("callbar-next") || bar.querySelector(".w");
  var heroCopy = document.querySelector("#top .hero-copy") || document.getElementById("top");
  var work = document.getElementById("work");
  var price = document.getElementById("price");
  var contact = document.getElementById("contact");
  var visible = { top: false, work: false, price: false, contact: false };
  var mq = window.matchMedia("(max-width: 999px)");

  function paint() {
    var hide = visible.top || visible.contact || !mq.matches;
    bar.classList.toggle("hide", hide);
    bar.toggleAttribute("inert", hide);
    bar.setAttribute("aria-hidden", hide ? "true" : "false");
    document.body.classList.toggle("callbar-on", !hide);
    if (!next) return;
    if (visible.price) {
      next.textContent = "Text me";
      next.setAttribute("href", "sms:+17026701158");
    } else if (visible.work || visible.top) {
      next.textContent = "See the work";
      next.setAttribute("href", "#work");
    } else {
      next.textContent = "See pricing";
      next.setAttribute("href", "#price");
    }
  }

  function watch(el, key, opts) {
    if (!el || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (entries) {
      visible[key] = entries[0].isIntersecting;
      paint();
    }, opts).observe(el);
  }

  watch(heroCopy, "top", { threshold: 0.15 });
  watch(work, "work", { threshold: 0.15 });
  watch(price, "price", { threshold: 0 });
  watch(contact, "contact", { threshold: 0.15 });
  if (mq.addEventListener) mq.addEventListener("change", paint);
  else if (mq.addListener) mq.addListener(paint);
  window.addEventListener("resize", paint);
  paint();
})();
