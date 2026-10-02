(() => {
  "use strict";

  // Event facts and optional links live here so updates stay in one place.
  const CONFIG = {
    kickoff: "2026-10-12T00:00:00+05:30",
    registrationDeadline: "2026-10-10",
    registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfEC7Sndyksvk125Jr8TzwKhKVcqiFLFZwL3chNYuNbataJRg/viewform",
    aeroinUrl: "https://www.aeroin.space/",
    timeline: [
      { date: "2026-10-10", displayDate: "10 October 2026", title: "Registration closes", details: [] },
      { date: "2026-10-12", displayDate: "12 October 2026", title: "Hackathon begins", details: ["12 am IST", "Rajalakshmi Engineering College, Chennai"] },
      { date: "2026-10-13", displayDate: "13 October 2026", title: "Hackathon ends", details: ["Rajalakshmi Engineering College, Chennai"] },
    ],
    tracks: [
      "01. Space Applications & Defence Technology",
      "02. Medical, Food & Agriculture in Space",
      "03. Autonomous & Communication Technology",
      "04. Sustainability in Space",
      "05. Miscellaneous / Open Innovation",
    ],
    faq: [
      { question: "What is Sedhacks 2026?", answerId: "faq-answer-1", answerHtml: `<p>SEDS REC presents a student-led hackathon bringing together young innovators from diverse disciplines to develop solutions for challenges related to space, technology and sustainability.</p>` },
      { question: "When and where is the hackathon?", answerId: "faq-answer-2", answerHtml: `<p>12–13 October 2026 at Rajalakshmi Engineering College, Chennai.</p>` },
      { question: "When does the kickoff happen?", answerId: "faq-answer-3", answerHtml: `<p>12 am IST on 12 October 2026.</p>` },
      { question: "What is the last date to register?", answerId: "faq-answer-4", answerHtml: `<p>10 October 2026.</p>` },
      { question: "What are the hackathon tracks?", answerId: "faq-answer-5", answerHtml: `<ol><li><strong>01. Space Applications &amp; Defence Technology</strong> — Explore innovative technologies and applications for space and defence.</li><li><strong>02. Medical, Food &amp; Agriculture in Space</strong> — Develop ideas addressing healthcare, food systems and agriculture for space environments.</li><li><strong>03. Autonomous &amp; Communication Technology</strong> — Build solutions involving autonomous systems, communication technologies and intelligent applications.</li><li><strong>04. Sustainability in Space</strong> — Address challenges related to sustainable space exploration, resource utilisation and future space missions.</li><li><strong>05. Miscellaneous / Open Innovation</strong> — Have an innovative space-related idea that does not fit the above tracks? This is your space to explore it.</li></ol>` },
      { question: "What is the prize pool?", answerId: "faq-answer-6", answerHtml: `<p><strong>₹10,000 Prize Pool.</strong> 1st place: ₹5,000; 2nd place: ₹3,000; 3rd place: ₹2,000. Compete, innovate and get recognised for your solution.</p>` },
      { question: "What are the internship benefit and qualification?", answerId: "faq-answer-7", answerHtml: `<p>The Top 3 teams will receive internship opportunities through our industry collaboration with Aeroin Space Tech, subject to the organisation's selection process.</p>` },
      { question: "How do I register?", answerId: "faq-answer-8", answerHtml: `<p>Use a Register button in the navigation, hero or page footer to open the registration form in this tab.</p>` },
    ],
    contact: [],
    social: [],
  };

  const body = document.body;
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".primary-nav");
  const motionRoot = document.documentElement;
  const motionPreference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  // The query override makes the reduced-motion path easy to preview and verify.
  const previewReducedMotion = new URLSearchParams(window.location.search).get("reduce") === "1";
  const motionToggle = document.querySelector(".motion-toggle");
  const interactionAnimations = new Map();
  let userPausedMotion = false;

  function motionAllowed() {
    return !previewReducedMotion && !(motionPreference?.matches ?? false);
  }

  // Native animations are cancelled before replacement, so rapid input stays responsive.
  function animateElement(element, frames, options, onFinish) {
    interactionAnimations.get(element)?.cancel();
    if (!element.animate) {
      onFinish?.();
      return;
    }
    const animation = element.animate(frames, options);
    interactionAnimations.set(element, animation);
    animation.finished.then(() => {
      if (interactionAnimations.get(element) !== animation) return;
      interactionAnimations.delete(element);
      animation.cancel();
      onFinish?.();
    }, () => {
      if (interactionAnimations.get(element) === animation) interactionAnimations.delete(element);
    });
    return animation;
  }

  document.querySelectorAll(".nav-register, .register-button, .footer-register").forEach((link) => {
    link.href = CONFIG.registrationUrl;
  });
  const aeroinLink = document.querySelector(".sponsor-mark");
  if (aeroinLink) aeroinLink.href = CONFIG.aeroinUrl;

  function setHeaderScrolled(scrolled) {
    if (header) header.dataset.scrolled = String(scrolled);
  }

  if (nav) {
    nav.addEventListener("click", (event) => {
      const link = event.target.closest("a[href^='#']");
      if (!link) return;
      const target = document.querySelector(link.getAttribute("href"));
      const focusTarget = target?.matches("h1, h2, h3") ? target : target?.querySelector("h1, h2, h3");
      if (focusTarget) {
        requestAnimationFrame(() => focusTarget.focus({ preventScroll: true }));
      }
    });
  }

  const timelineList = document.querySelector(".timeline-list");
  if (timelineList) {
    const timelineContent = document.createDocumentFragment();
    CONFIG.timeline.forEach((entry, index) => {
      const item = document.createElement("li");
      item.className = "timeline-item";
      const marker = document.createElement("span");
      marker.className = "timeline-marker";
      marker.setAttribute("aria-hidden", "true");
      const date = document.createElement("time");
      date.dateTime = index === 0 ? CONFIG.registrationDeadline : entry.date;
      date.textContent = entry.displayDate;
      const title = document.createElement("h3");
      title.textContent = entry.title;
      item.append(marker, date, title);
      if (entry.details.length) {
        const detail = document.createElement("p");
        entry.details.forEach((line, lineIndex) => {
          if (lineIndex) detail.append(document.createElement("br"));
          detail.append(document.createTextNode(line));
        });
        item.append(detail);
      }
      timelineContent.append(item);
    });
    timelineList.replaceChildren(timelineContent);
  }

  const tabList = document.querySelector(".track-tabs");
  const trackTabs = [...document.querySelectorAll(".track-tab")];
  const trackPanels = [...document.querySelectorAll(".track-panel")];
  let activeTrack = -1;
  let outgoingTrack = null;
  let sceneFrame = 0;
  const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine) and (min-width: 768px)");

  function resetScenePosition() {
    cancelAnimationFrame(sceneFrame);
    sceneFrame = 0;
    trackPanels.forEach((panel) => {
      panel.querySelector(".track-scene")?.style.removeProperty("--scene-x");
      panel.querySelector(".track-scene")?.style.removeProperty("--scene-y");
    });
  }

  function finishTrackExit() {
    if (!outgoingTrack) return;
    interactionAnimations.get(outgoingTrack)?.cancel();
    outgoingTrack.hidden = true;
    outgoingTrack.classList.remove("track-panel-leaving");
    outgoingTrack = null;
  }

  if (tabList && trackTabs.length && trackTabs.length === trackPanels.length) {
    tabList.setAttribute("role", "tablist");
    tabList.setAttribute("aria-orientation", "horizontal");

    function activateTrack(index, focusTab = false) {
      if (index === activeTrack) {
        if (focusTab) trackTabs[index].focus();
        return;
      }
      finishTrackExit();
      const previous = trackPanels[activeTrack];
      const next = trackPanels[index];
      const transition = previous && motionAllowed() && typeof next.animate === "function";
      trackTabs.forEach((tab, tabIndex) => {
        const selected = tabIndex === index;
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", trackPanels[tabIndex].id);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        trackPanels[tabIndex].setAttribute("role", "tabpanel");
        trackPanels[tabIndex].setAttribute("aria-labelledby", tab.id);
        trackPanels[tabIndex].hidden = !selected;
        trackPanels[tabIndex].inert = !selected;
        trackPanels[tabIndex].setAttribute("aria-hidden", String(!selected));
      });
      activeTrack = index;
      resetScenePosition();
      if (transition) {
        outgoingTrack = previous;
        previous.classList.add("track-panel-leaving");
        previous.hidden = false;
        animateElement(previous, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 180, easing: "ease-out", fill: "both",
        }, () => {
          if (outgoingTrack === previous) finishTrackExit();
        });
        animateElement(next.querySelector(".track-copy"), [
          { opacity: 0, transform: "translateY(6px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 320, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
        animateElement(next.querySelector(".track-scene"), [{ opacity: 0 }, { opacity: 1 }], {
          duration: 360, easing: "ease-out",
        });
      } else if (previous) {
        animateElement(next, [{ opacity: 0.6 }, { opacity: 1 }], { duration: 140, easing: "ease-out" });
      }
      if (focusTab) trackTabs[index].focus();
    }

    trackTabs.forEach((tab, index) => {
      tab.id = `track-tab-${String(index + 1).padStart(2, "0")}`;
      tab.setAttribute("aria-label", CONFIG.tracks[index]);
      tab.addEventListener("click", (event) => {
        event.preventDefault();
        activateTrack(index);
      });
      tab.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % trackTabs.length;
        else if (event.key === "ArrowLeft") nextIndex = (index - 1 + trackTabs.length) % trackTabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = trackTabs.length - 1;
        else return;
        event.preventDefault();
        activateTrack(nextIndex, true);
      });
    });
    activateTrack(0);
  }

  trackPanels.forEach((panel) => {
    panel.addEventListener("pointermove", (event) => {
      if (!finePointer?.matches || !motionAllowed() || userPausedMotion || document.hidden || event.pointerType === "touch") return;
      const scene = panel.querySelector(".track-scene");
      if (!scene) return;
      cancelAnimationFrame(sceneFrame);
      sceneFrame = requestAnimationFrame(() => {
        const rect = scene.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
        scene.style.setProperty("--scene-x", `${(x * 4).toFixed(2)}px`);
        scene.style.setProperty("--scene-y", `${(y * 3).toFixed(2)}px`);
      });
    });
    panel.addEventListener("pointerleave", resetScenePosition);
  });
  finePointer?.addEventListener?.("change", resetScenePosition);

  CONFIG.faq.forEach((entry, index) => {
    const item = document.querySelectorAll(".faq-item")[index];
    const button = item?.querySelector(".faq-toggle");
    const question = item?.querySelector(".faq-heading");
    const answer = document.getElementById(entry.answerId);
    if (!button || !question || !answer) return;

    button.setAttribute("aria-controls", entry.answerId);
    button.querySelector(".faq-button-label").textContent = entry.question;
    answer.innerHTML = entry.answerHtml;
    button.setAttribute("aria-expanded", "false");
    question.hidden = true;
    button.hidden = false;
    answer.hidden = true;
    answer.inert = true;
    answer.setAttribute("aria-hidden", "true");

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") !== "true";
      const startHeight = answer.hidden ? 0 : answer.getBoundingClientRect().height;
      const startOpacity = answer.hidden ? 0 : getComputedStyle(answer).opacity;
      const startMargin = answer.hidden ? "0px" : getComputedStyle(answer).marginTop;
      interactionAnimations.get(answer)?.cancel();
      button.setAttribute("aria-expanded", String(expanded));
      answer.hidden = false;
      answer.inert = !expanded;
      answer.setAttribute("aria-hidden", String(!expanded));
      button.querySelector(".faq-marker").textContent = expanded ? "−" : "+";
      const endHeight = expanded ? answer.scrollHeight : 0;
      answer.classList.add("faq-transitioning");
      // Height is intentional here: the surrounding questions must move with the answer.
      animateElement(answer, [
        { height: `${motionAllowed() ? startHeight : endHeight}px`, opacity: startOpacity, marginTop: motionAllowed() ? startMargin : expanded ? "7px" : "0px" },
        { height: `${endHeight}px`, opacity: expanded ? 1 : 0, marginTop: expanded ? "7px" : "0px" },
      ], {
        duration: motionAllowed() ? 260 : 140,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both",
      }, () => {
        answer.hidden = !expanded;
        answer.classList.remove("faq-transitioning");
      });
    });
  });

  function renderOptionalLinks(columnId, entries, emptyMessage) {
    const column = document.getElementById(columnId);
    if (!column) return;
    const validEntries = entries.filter((entry) => {
      if (!entry?.name || !entry?.href || !/^(https?:\/\/|mailto:|tel:)/i.test(entry.href.trim())) return false;
      try {
        const url = new URL(entry.href, window.location.href);
        return ["https:", "http:", "mailto:", "tel:"].includes(url.protocol);
      } catch {
        return false;
      }
    });
    const fallback = column.querySelector(".footer-empty");
    if (!validEntries.length) {
      if (fallback) fallback.textContent = emptyMessage;
      return;
    }
    fallback?.remove();
    const list = document.createElement("ul");
    list.className = "footer-dynamic-links";
    validEntries.forEach(({ name, href }) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = href;
      link.textContent = name;
      item.append(link);
      list.append(item);
    });
    column.append(list);
  }

  renderOptionalLinks("contact-column", CONFIG.contact, "Contact details to be added");
  renderOptionalLinks("social-column", CONFIG.social, "Social links to be added");

  const kickoff = Date.parse(CONFIG.kickoff);
  const countdown = document.querySelector(".countdown");
  const timerStatic = document.querySelector(".timer-static");
  const countdownGrid = document.querySelector(".countdown-grid");
  const startedMessage = document.querySelector(".started-message");
  const kickoffStatus = document.getElementById("kickoff-status");
  let hasAnnouncedStart = false;

  function updateCountdown() {
    if (!countdown || !Number.isFinite(kickoff)) return;
    countdown.hidden = false;
    const remaining = kickoff - Date.now();
    if (remaining <= 0) {
      if (countdownGrid) countdownGrid.hidden = true;
      const urgency = countdown.querySelector(".urgency-line");
      if (urgency) urgency.hidden = true;
      if (startedMessage) startedMessage.hidden = false;
      if (!hasAnnouncedStart && kickoffStatus) kickoffStatus.textContent = "The hackathon has begun";
      hasAnnouncedStart = true;
      return;
    }
    if (countdownGrid) countdownGrid.hidden = false;
    if (startedMessage) startedMessage.hidden = true;
    const urgency = countdown.querySelector(".urgency-line");
    if (urgency) urgency.hidden = false;
    const seconds = Math.floor(remaining / 1000);
    const values = {
      days: Math.floor(seconds / 86400),
      hours: Math.floor((seconds % 86400) / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    };
    Object.entries(values).forEach(([unit, value]) => {
      const output = countdown.querySelector(`[data-count="${unit}"]`);
      const nextValue = String(value).padStart(2, "0");
      if (!output || output.textContent === nextValue) return;
      output.textContent = nextValue;
      if (countdown.dataset.motionVisible === "true" && !document.hidden && !userPausedMotion) {
        animateElement(output, [
          { opacity: 0.65, transform: motionAllowed() ? "translateY(2px)" : "none" },
          { opacity: 1, transform: "none" },
        ], { duration: 170, easing: "ease-out" });
      }
    });
    if (timerStatic) timerStatic.hidden = false;
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateCountdown();
  });

  const sectionLinks = [...document.querySelectorAll(".primary-nav a[href^='#']")];
  const sectionTargets = sectionLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const navMarker = document.createElement("span");
  navMarker.className = "nav-marker";
  navMarker.setAttribute("aria-hidden", "true");
  nav?.append(navMarker);

  function positionNavMarker() {
    const selected = nav?.querySelector("[aria-current='location']");
    navMarker.dataset.active = String(Boolean(selected));
    if (!selected) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = selected.getBoundingClientRect();
    navMarker.style.setProperty("--marker-x", `${linkRect.left - navRect.left + linkRect.width / 2 - 12.5}px`);
    navMarker.style.setProperty("--marker-y", `${linkRect.top - navRect.top - 5}px`);
  }

  if (nav && "ResizeObserver" in window) new ResizeObserver(positionNavMarker).observe(nav);
  document.fonts?.ready.then(positionNavMarker);
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      sectionLinks.forEach((link) => {
        if (link.hash === `#${current.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      positionNavMarker();
    }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5, 1] });
    sectionTargets.forEach((target) => sectionObserver.observe(target));
  }

  const headerSentinel = document.querySelector(".header-scroll-sentinel");
  setHeaderScrolled(window.scrollY > 8);
  if (header && headerSentinel && "IntersectionObserver" in window) {
    const headerObserver = new IntersectionObserver(([entry]) => {
      setHeaderScrolled(!entry.isIntersecting);
    });
    headerObserver.observe(headerSentinel);
  }
  body.classList.add("js-ready");

  document.querySelectorAll(".register-outline").forEach((link) => {
    const sheen = document.createElement("span");
    sheen.className = "register-sheen";
    sheen.setAttribute("aria-hidden", "true");
    const light = document.createElement("span");
    light.className = "register-sheen-light";
    sheen.append(light);
    link.append(sheen);
    function shine() {
      if (!motionAllowed()) return;
      animateElement(light, [
        { transform: "translateX(-110%)" },
        { transform: "translateX(110%)" },
      ], { duration: 700, easing: "cubic-bezier(0.4, 0, 0.2, 1)" });
    }
    link.addEventListener("pointerenter", (event) => { if (event.pointerType !== "touch") shine(); });
    link.addEventListener("focus", shine);
  });

  document.querySelectorAll(".trophy").forEach((trophy) => {
    const trophyArt = document.createElement("span");
    trophyArt.className = "trophy-art ambient-motion";
    trophyArt.setAttribute("aria-hidden", "true");
    const glint = document.createElement("span");
    glint.className = "trophy-glint";
    trophy.replaceWith(trophyArt);
    trophy.classList.remove("ambient-motion");
    trophyArt.append(trophy, glint);
  });

  // Decorative loops run only near the viewport, and stop in background tabs.
  const ambientElements = [...document.querySelectorAll(".ambient-motion, .register-outline, .countdown")];
  if ("IntersectionObserver" in window) {
    const ambientObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        target.dataset.motionVisible = String(isIntersecting);
      });
    }, { rootMargin: "100px", threshold: 0 });
    ambientElements.forEach((element) => ambientObserver.observe(element));
  } else {
    ambientElements.forEach((element) => { element.dataset.motionVisible = "true"; });
  }

  function syncPageVisibility() {
    motionRoot.classList.toggle("motion-suspended", document.hidden);
    if (document.hidden) resetScenePosition();
  }
  document.addEventListener("visibilitychange", syncPageVisibility);
  syncPageVisibility();

  const revealGroups = [
    [".timer-section > .command-label", ".timer-section > h2", ".timer-section > .timer-static", ".timer-section > .countdown", ".timer-section > .event-facts"],
    [".timeline-section .section-heading", ".timeline-list"],
    [".tracks-section .section-heading", ".track-tabs"],
    [".prizes-section .section-heading", ".prize-display", ".internship-note"],
    [".sponsors-section .section-heading", ".sponsor-mark", ".sponsor-copy"],
    [".about-section .section-heading", ".about-content"],
    [".faq-section .section-heading", ".faq-item"],
    [".footer-wordmark", ".footer-register", ".footer-content"],
  ];
  const revealElements = [...new Set(revealGroups.flatMap((group) => group.flatMap((selector) => [...document.querySelectorAll(selector)])))];
  let revealObserver = null;

  function configureMotion() {
    const reduced = !motionAllowed();
    motionRoot.classList.toggle("motion-enabled", !reduced);
    motionRoot.classList.toggle("motion-reduced", reduced);
    motionRoot.classList.toggle("motion-paused", reduced || userPausedMotion);
    if (reduced || userPausedMotion) resetScenePosition();
    if (motionToggle) {
      motionToggle.hidden = reduced;
      motionToggle.dataset.paused = String(userPausedMotion);
      const label = userPausedMotion ? "Resume ambient motion" : "Pause ambient motion";
      motionToggle.setAttribute("aria-label", label);
      motionToggle.title = label;
      const visibleLabel = motionToggle.querySelector(".motion-toggle-label");
      if (visibleLabel) visibleLabel.textContent = label;
    }

    if (reduced) {
      interactionAnimations.forEach((animation) => animation.finish());
      finishTrackExit();
      revealObserver?.disconnect();
      revealObserver = null;
      motionRoot.classList.remove("motion-ready");
      revealElements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    if (revealObserver || !revealElements.length) return;
    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    revealGroups.forEach((group) => {
      const groupElements = [...new Set(group.flatMap((selector) => [...document.querySelectorAll(selector)]))];
      groupElements.forEach((element, index) => {
        element.classList.add("motion-reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 65}ms`);
      });
    });
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        revealObserver?.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -48px 0px", threshold: 0.08 });
    motionRoot.classList.add("motion-ready");
    revealElements.forEach((element) => revealObserver.observe(element));
  }

  motionToggle?.addEventListener("click", () => {
    userPausedMotion = !userPausedMotion;
    configureMotion();
  });
  if (motionPreference?.addEventListener) motionPreference.addEventListener("change", configureMotion);
  else motionPreference?.addListener(configureMotion);
  configureMotion();
})();
