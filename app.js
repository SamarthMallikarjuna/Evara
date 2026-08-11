/* ----------------------------------------------------
   NET ZERO FAST FASHION - CORE APP ENGINE
   ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. KNOW YOUR GARMENT INTERACTIVE QUIZ TOOL ---
  let quizData = { fabric: null, condition: null, repair: null };

  const qCard1 = document.getElementById('q-card-1');
  const qCard2 = document.getElementById('q-card-2');
  const qCard3 = document.getElementById('q-card-3');
  const qCard4 = document.getElementById('q-card-4');

  const nav1 = document.getElementById('quiz-nav-1');
  const nav2 = document.getElementById('quiz-nav-2');
  const nav3 = document.getElementById('quiz-nav-3');
  const nav4 = document.getElementById('quiz-nav-4');

  const resultRouteTitle = document.getElementById('result-route-title');
  const resultRouteDesc = document.getElementById('result-route-desc');
  const resultRouteAction = document.getElementById('result-route-action');
  const btnQuizReset = document.getElementById('btn-quiz-reset');

  if (qCard1) {
    document.querySelectorAll('#q-card-1 .quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        quizData.fabric = btn.getAttribute('data-fabric');
        qCard1.style.display = 'none';
        qCard2.style.display = 'block';
        if (nav1) nav1.classList.remove('active');
        if (nav2) nav2.classList.add('active');
      });
    });
  }

  if (qCard2) {
    document.querySelectorAll('#q-card-2 .quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        quizData.condition = btn.getAttribute('data-condition');
        qCard2.style.display = 'none';
        qCard3.style.display = 'block';
        if (nav2) nav2.classList.remove('active');
        if (nav3) nav3.classList.add('active');
      });
    });
  }

  if (qCard3) {
    document.querySelectorAll('#q-card-3 .quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        quizData.repair = btn.getAttribute('data-repair');
        qCard3.style.display = 'none';
        qCard4.style.display = 'block';
        if (nav3) nav3.classList.remove('active');
        if (nav4) nav4.classList.add('active');
        renderQuizResult();
      });
    });
  }

  function renderQuizResult() {
    if (quizData.condition === 'good' && quizData.repair === 'yes') {
      resultRouteTitle.textContent = 'Recommendation: Donate or Thrift Wearable Clothing';
      resultRouteDesc.textContent = 'Your garment is in good wearable condition! Donate it to community clothing channels so someone else can wear it.';
      resultRouteAction.innerHTML = '<strong>Recommended Drop-Off:</strong> Goonj Bengaluru Collection Center or local dry waste collection hub wearable section.';
    } else if (quizData.condition === 'minor' && quizData.repair === 'yes') {
      resultRouteTitle.textContent = 'Recommendation: Local Repair & Tailoring';
      resultRouteDesc.textContent = 'Minor seam tears or zipper issues can be repaired cheaply at neighborhood tailors in Bengaluru.';
      resultRouteAction.innerHTML = '<strong>Action:</strong> Visit a local repair tailor in Indiranagar, Koramangala, or Jayanagar.';
    } else if (quizData.fabric === 'cotton' && (quizData.condition === 'degraded' || quizData.condition === 'soiled')) {
      resultRouteTitle.textContent = 'Recommendation: Downcycling into Industrial Wiping Rags (Chindi)';
      resultRouteDesc.textContent = 'Pure degraded cotton absorbs oil and water efficiently. It is ideal for mechanical wiping rags in Peenya industrial area.';
      resultRouteAction.innerHTML = '<strong>Drop-off Option:</strong> Saahas Zero Waste Hub / Hasiru Dala DWCC for rag processing.';
    } else {
      resultRouteTitle.textContent = 'Recommendation: Dedicated Civil Upcycling Collection (Geotextiles / Acoustic Panels)';
      resultRouteDesc.textContent = 'Non-reusable synthetic fabrics (polyester/nylon blends) cannot be donated, repaired, or downcycled into rags (synthetics do not absorb oil/water). They require specialized segregation to lock carbon in building materials!';
      resultRouteAction.innerHTML = '<strong>Action Plan:</strong> Tag as "Synthetic Reject Waste" and drop off at your nearest Hasiru Dala or Saahas Segregation Hub for civil composite processing (geotextiles & soundproofing panels).';
    }
  }

  if (btnQuizReset) {
    btnQuizReset.addEventListener('click', () => {
      quizData = { fabric: null, condition: null, repair: null };
      qCard4.style.display = 'none';
      qCard1.style.display = 'block';
      if (nav4) nav4.classList.remove('active');
      if (nav1) nav1.classList.add('active');
    });
  }

  // --- 2. LIVE BENGALURU WASTE METRIC ---
  const liveCounterElem = document.getElementById('live-waste-counter');
  let currentKg = 14820;

  setInterval(() => {
    currentKg += Math.floor(Math.random() * 3) + 1;
    if (liveCounterElem) {
      liveCounterElem.textContent = `${currentKg.toLocaleString()} kg`;
    }
  }, 4500);

  // --- 3. BENGALURU DROP-OFF LOCATOR SEARCH ---
  const collectionHubs = [
    { name: 'Hasiru Dala DWCC Center', area: 'Indiranagar', address: '12th Main Road, 100 Feet Rd, Indiranagar', phone: '+91 80 2520 1192', type: 'Synthetic & Civil Upcycling' },
    { name: 'Saahas Zero Waste Hub', area: 'Whitefield', address: 'EPIP Zone, Near ITPL, Whitefield', phone: '+91 80 4168 9889', type: 'Full Textile Segregation' },
    { name: 'Peenya Downcycling Facility', area: 'Peenya', address: '3rd Stage, Peenya Industrial Area', phone: '+91 80 2839 4451', type: 'Cotton Chindi Rags & Felt' },
    { name: 'Koramangala DWCC Hub', area: 'Koramangala', address: 'Block 4, 80 Feet Road, Koramangala', phone: '+91 80 2553 1002', type: 'Dry Waste Segregation' },
    { name: 'Jayanagar Eco-Point', area: 'Jayanagar', address: '4th T Block, Jayanagar', phone: '+91 80 2664 3004', type: 'Poly-Cotton & Synthetic Drop' },
    { name: 'Yelahanka Citizen Hub', area: 'Yelahanka', address: 'New Town Sector 3, Yelahanka', phone: '+91 80 2856 7010', type: 'Synthetic Upcycling Center' }
  ];

  const searchInput = document.getElementById('area-search-input');
  const searchBtn = document.getElementById('area-search-btn');
  const resultsContainer = document.getElementById('area-hubs-results');

  function renderHubs(filter = '') {
    if (!resultsContainer) return;
    const q = filter.toLowerCase().trim();
    const filtered = collectionHubs.filter(h => 
      h.name.toLowerCase().includes(q) || 
      h.area.toLowerCase().includes(q) || 
      h.address.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding:25px; background:#FFFFFF; border-radius:12px;">
          <p style="color:var(--text-dark-muted)">No collection hubs found matching "${filter}". Try searching "Indiranagar", "Peenya", or "Whitefield".</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(h => `
      <div class="center-card">
        <h5>${h.name}</h5>
        <p><strong>Area:</strong> ${h.area}</p>
        <p><strong>Address:</strong> ${h.address}</p>
        <p><strong>Contact:</strong> ${h.phone}</p>
        <div class="center-type-tag">${h.type}</div>
      </div>
    `).join('');
  }

  renderHubs();

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => renderHubs(searchInput.value));
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') renderHubs(searchInput.value);
    });
  }

  // --- 4. GOOGLE FORM EXTERNAL LINK SYNC ---
  const openFormExternal = document.getElementById('open-form-external');
  const googleFormIframe = document.getElementById('google-form-iframe');

  if (openFormExternal && googleFormIframe) {
    openFormExternal.href = googleFormIframe.src.replace('?embedded=true', '');
  }

  // --- 5. FULL-SCREEN BRAND DETAIL MODAL (EXACTLY 3 SENTENCES PER BRAND) ---
  const brandModalOverlay = document.getElementById('brand-modal-overlay');
  const brandModalCloseBtn = document.getElementById('brand-modal-close');

  const modalBrandLogo = document.getElementById('modal-brand-logo');
  const modalBrandName = document.getElementById('modal-brand-name');
  const modalBrandType = document.getElementById('modal-brand-type');
  const modalS1 = document.getElementById('modal-s1');
  const modalS2 = document.getElementById('modal-s2');
  const modalS3 = document.getElementById('modal-s3');

  const brandDetails = {
    uniqlo: {
      name: 'UNIQLO',
      type: 'Fleece & Synthetic Basics',
      logo: 'assets/uniqlo_user_logo.png',
      s1: 'Uniqlo is a Japanese fast fashion retailer known for mass-producing millions of synthetic fleece and HEATTECH garments every year.',
      s2: 'Over 60% of their product lineup relies heavily on polyester and nylon blends that do not naturally decompose.',
      s3: 'These high-volume synthetic basics contribute significantly to global microplastic shedding and urban landfill accumulation.'
    },
    hm: {
      name: 'H&M',
      type: 'Weekly Trend Turnover',
      logo: 'assets/hm_user_logo.png',
      s1: 'H&M is one of the world\'s largest fast fashion retailers, releasing thousands of new clothing styles every single week.',
      s2: 'Their ultra-fast business model encourages rapid garment replacement, leading to most items being discarded after just a few wears.',
      s3: 'Millions of their unsold or torn synthetic clothes are incinerated in cement kilns or dumped into landfills annually.'
    },
    levis: {
      name: 'LEVI\'S',
      type: 'Poly-Denim Stretch Blends',
      logo: 'assets/levis_user_logo.png',
      s1: 'While historically famous for 100% cotton denim, modern Levi\'s lines feature heavy polyester and elastane stretch blends.',
      s2: 'Blending synthetic fibers into cotton denim makes mechanical fiber separation and traditional recycling virtually impossible.',
      s3: 'As a result, worn-out poly-blend jeans are forced into city waste streams instead of circular upcycling pathways.'
    }
  };

  document.querySelectorAll('.brand-mini-card').forEach(card => {
    card.addEventListener('click', () => {
      const brandKey = card.getAttribute('data-brand');
      const data = brandDetails[brandKey];
      if (!data || !brandModalOverlay) return;

      modalBrandLogo.src = data.logo;
      modalBrandName.textContent = data.name;
      modalBrandType.textContent = data.type;
      modalS1.textContent = data.s1;
      modalS2.textContent = data.s2;
      modalS3.textContent = data.s3;

      brandModalOverlay.classList.add('active');
      brandModalOverlay.setAttribute('aria-hidden', 'false');
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  function closeModal() {
    if (!brandModalOverlay) return;
    brandModalOverlay.classList.remove('active');
    brandModalOverlay.setAttribute('aria-hidden', 'true');
  }

  if (brandModalCloseBtn) {
    brandModalCloseBtn.addEventListener('click', closeModal);
  }

  if (brandModalOverlay) {
    brandModalOverlay.addEventListener('click', (e) => {
      if (e.target === brandModalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && brandModalOverlay && brandModalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // --- 6. DESTROYING FATES SQUARE CARDS & BRAND-STYLE MODAL (CEMENT KILNS & LANDFILLS) ---
  const fateModalDetails = {
    1: {
      emoji: '🔥',
      name: 'CO-PROCESSING (CEMENT KILNS)',
      type: 'High-Carbon Kiln Incineration',
      desc1: 'Since non-reusable synthetic garments have zero resale value, waste management facilities are forced to pay out of pocket to transport this "reject waste" to cement factories.',
      desc2: 'There, it is incinerated in high-heat kilns as a cheap fuel substitute for coal.',
      desc3: 'While it keeps clothes out of landfills, it releases massive toxic carbon emissions into Bengaluru\'s air atmosphere.'
    },
    2: {
      emoji: '🏔️',
      name: 'THE LANDFILL & MICROPLASTIC FATE',
      type: 'Bellahalli, Mittaganahalli & Lakes',
      desc1: 'The vast majority of non-reusable synthetic clothes end up dumped in overflowing landfills like Bellahalli or Mittaganahalli.',
      desc2: 'Because synthetic fabrics are essentially petroleum plastic, they never decompose.',
      desc3: 'Instead, they slowly break down into toxic microplastics, which wash straight into Bengaluru\'s lakes (such as Bellandur or Varthur) during the monsoon.'
    }
  };

  const fateModalOverlay = document.getElementById('fate-modal-overlay');
  const fateModalCloseBtn = document.getElementById('fate-modal-close');
  const modalFateEmoji = document.getElementById('modal-fate-emoji');
  const modalFateName = document.getElementById('modal-fate-name');
  const modalFateType = document.getElementById('modal-fate-type');
  const modalFateDesc1 = document.getElementById('modal-fate-desc-1');
  const modalFateDesc2 = document.getElementById('modal-fate-desc-2');
  const modalFateDesc3 = document.getElementById('modal-fate-desc-3');

  function openFateModal(fateId) {
    const data = fateModalDetails[fateId];
    if (!data || !fateModalOverlay) return;

    if (modalFateEmoji) modalFateEmoji.textContent = data.emoji;
    if (modalFateName) modalFateName.textContent = data.name;
    if (modalFateType) modalFateType.textContent = data.type;
    if (modalFateDesc1) modalFateDesc1.textContent = data.desc1;
    if (modalFateDesc2) modalFateDesc2.textContent = data.desc2;
    if (modalFateDesc3) modalFateDesc3.textContent = data.desc3;

    fateModalOverlay.classList.add('active');
    fateModalOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeFateModal() {
    if (!fateModalOverlay) return;
    fateModalOverlay.classList.remove('active');
    fateModalOverlay.setAttribute('aria-hidden', 'true');
  }

  const fateSquareBtn1 = document.getElementById('fate-square-btn-1');
  const fateSquareBtn2 = document.getElementById('fate-square-btn-2');

  if (fateSquareBtn1) {
    fateSquareBtn1.addEventListener('click', () => openFateModal(1));
    fateSquareBtn1.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFateModal(1);
      }
    });
  }

  if (fateSquareBtn2) {
    fateSquareBtn2.addEventListener('click', () => openFateModal(2));
    fateSquareBtn2.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFateModal(2);
      }
    });
  }

  if (fateModalCloseBtn) fateModalCloseBtn.addEventListener('click', closeFateModal);

  if (fateModalOverlay) {
    fateModalOverlay.addEventListener('click', (e) => {
      if (e.target === fateModalOverlay) closeFateModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fateModalOverlay && fateModalOverlay.classList.contains('active')) {
      closeFateModal();
    }
  });

  // --- 7. A BETTER SOLUTION INTERACTIVE ACCORDION DECK ---
  const solutionCardDeck = document.getElementById('solution-card-deck');
  const solutionPanelCards = document.querySelectorAll('.solution-panel-card');
  const solutionPanelWrapper = document.getElementById('solution-panel-wrapper');
  const solutionsSection = document.getElementById('solutions');

  let currentSolutionStep = 1;
  let autoTimerSequence = [];

  function updateAccordionDeckPositions(activeStep) {
    currentSolutionStep = activeStep;

    solutionPanelCards.forEach(card => {
      const step = parseInt(card.getAttribute('data-step'));
      card.classList.remove('active-center', 'peek-left', 'peek-right');

      if (step < activeStep) {
        // Cards to the LEFT of active step -> Peek on Left edge
        card.classList.add('peek-left');
        const leftPos = (step - 1) * 28;
        card.style.left = leftPos + 'px';
        card.style.right = 'auto';
        card.style.zIndex = step;
      } else if (step === activeStep) {
        // ACTIVE CENTER Card
        card.classList.add('active-center');
        const leftPos = (step - 1) * 28;
        card.style.left = leftPos + 'px';
        card.style.right = 'auto';
        card.style.zIndex = 10;
      } else {
        // Cards to the RIGHT of active step -> Peek on Right edge
        card.classList.add('peek-right');
        const rightPos = (4 - step) * 28;
        card.style.left = 'auto';
        card.style.right = rightPos + 'px';
        card.style.zIndex = 10 - step;
      }
    });
  }

  // Add click listeners to every panel card so clicking any left or right edge opens that card
  solutionPanelCards.forEach(card => {
    card.addEventListener('click', () => {
      clearAutoSequence();
      const step = parseInt(card.getAttribute('data-step'));
      updateAccordionDeckPositions(step);
    });
  });

  function clearAutoSequence() {
    autoTimerSequence.forEach(timer => clearTimeout(timer));
    autoTimerSequence = [];
  }

  function runAutoCardSequence() {
    clearAutoSequence();
    updateAccordionDeckPositions(1);

    // Step 2 enters after 1200ms
    autoTimerSequence.push(setTimeout(() => {
      updateAccordionDeckPositions(2);
    }, 1200));

    // Step 3 enters after 2500ms
    autoTimerSequence.push(setTimeout(() => {
      updateAccordionDeckPositions(3);
    }, 2500));

    // Step 4 enters after 3800ms
    autoTimerSequence.push(setTimeout(() => {
      updateAccordionDeckPositions(4);
    }, 3800));
  }

  // IntersectionObserver triggers initial progression on scroll in
  if (solutionsSection && solutionPanelWrapper) {
    const solutionScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runAutoCardSequence();
          solutionPanelWrapper.classList.add('slide-in-active');
        } else {
          clearAutoSequence();
          updateAccordionDeckPositions(1);
          solutionPanelWrapper.classList.remove('slide-in-active');
        }
      });
    }, { threshold: 0.25 });

    solutionScrollObserver.observe(solutionsSection);
  }

  // --- 8. INTERSECTION OBSERVER FOR BOUNCY QUESTION MARK BADGE ---
  const qmarkBadge = document.querySelector('.big-qmark-badge');
  const genevaSection = document.getElementById('geneva-framework');

  if (qmarkBadge && genevaSection) {
    const qmarkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          qmarkBadge.classList.add('bouncy-active');
        }
      });
    }, { threshold: 0.2 });

    qmarkObserver.observe(genevaSection);
  }

  // --- 9. SCROLL REVEAL STAGGERED ANIMATION & TYPEWRITER FOR THE PROBLEM ---
  const problemCards = document.querySelectorAll('.scroll-reveal-card');
  const problemSection = document.getElementById('problem');
  const problemTypewriterText = document.getElementById('problem-typewriter-text');
  const problemCursor = document.getElementById('problem-cursor');
  const fullProblemTitle = "THE PROBLEM";

  if (problemSection) {
    let problemTimers = [];
    let typewriterInterval = null;

    function resetTypewriter() {
      if (typewriterInterval) clearInterval(typewriterInterval);
      typewriterInterval = null;
      if (problemTypewriterText) problemTypewriterText.textContent = "";
    }

    function startTypewriter() {
      resetTypewriter();
      let charIndex = 0;
      typewriterInterval = setInterval(() => {
        if (charIndex < fullProblemTitle.length) {
          problemTypewriterText.textContent += fullProblemTitle.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typewriterInterval);
          typewriterInterval = null;
        }
      }, 95);
    }

    function resetProblemCards() {
      problemTimers.forEach(t => clearTimeout(t));
      problemTimers = [];
      problemCards.forEach(card => card.classList.remove('revealed'));
    }

    const problemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startTypewriter();
          resetProblemCards();
          problemCards.forEach((card, index) => {
            const delay = parseInt(card.getAttribute('data-delay')) || index * 180;
            problemTimers.push(setTimeout(() => {
              card.classList.add('revealed');
            }, delay));
          });
        } else {
          resetTypewriter();
          resetProblemCards();
        }
      });
    }, { threshold: 0.2 });

    problemObserver.observe(problemSection);
  }

  // --- 10. MOVING GARBAGE TRUCK ANIMATION (RE-TRIGGERS ON SCROLL IN/OUT) ---
  const truck = document.getElementById('garbage-truck');
  const step1 = document.getElementById('journey-step-1');
  const step2 = document.getElementById('journey-step-2');
  const step3 = document.getElementById('journey-step-3');
  const disposalSection = document.getElementById('disposal-journey');

  if (truck && step1 && step2 && step3 && disposalSection) {
    let progress = 14;      // Start at Step 1 position (%)
    const startPos = 14;    // Step 1 position (%)
    const endPos = 86;      // Step 3 node position (%)
    const speed = 0.14;     // Slower, smooth majestic driving speed
    let isDriving = false;
    let animFrameId = null;
    let truckTimeoutId = null;

    function resetTruckAnimation() {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (truckTimeoutId) clearTimeout(truckTimeoutId);
      isDriving = false;
      progress = startPos;
      truck.style.left = startPos + '%';
      truck.style.top = '50%';
      step1.classList.remove('truck-active');
      step2.classList.remove('truck-active');
      step3.classList.remove('truck-active');
    }

    function runTruckOnce() {
      if (!isDriving) return;

      if (progress < endPos) {
        progress += speed;
        if (progress > endPos) progress = endPos;

        truck.style.left = progress + '%';
        truck.style.top = '50%';

        // Synchronize Icon Zoom In & Out as truck passes
        if (progress >= 8 && progress <= 32) {
          step1.classList.add('truck-active');
          step2.classList.remove('truck-active');
          step3.classList.remove('truck-active');
        } else if (progress >= 36 && progress <= 64) {
          step1.classList.remove('truck-active');
          step2.classList.add('truck-active');
          step3.classList.remove('truck-active');
        } else if (progress >= 68) {
          step1.classList.remove('truck-active');
          step2.classList.remove('truck-active');
          step3.classList.add('truck-active');
        }

        animFrameId = requestAnimationFrame(runTruckOnce);
      } else {
        // Truck stopped at Step 3! Pause zoomed icon then return to normal
        truckTimeoutId = setTimeout(() => {
          step3.classList.remove('truck-active');
        }, 1200);
      }
    }

    const truckObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resetTruckAnimation();
          isDriving = true;
          animFrameId = requestAnimationFrame(runTruckOnce);
        } else {
          resetTruckAnimation();
        }
      });
    }, { threshold: 0.25 });

    truckObserver.observe(disposalSection);
  }

  // --- 11. BRAND LOGOS & PILL WAVE ANIMATIONS (RE-TRIGGERS ON SCROLL IN/OUT) ---
  const brandLogos = document.querySelectorAll('.brand-mini-logo');
  const pillBadges = document.querySelectorAll('.ff-quick-pill');
  const fastFashionSection = document.getElementById('what-is-fast-fashion');

  if (brandLogos.length > 0 && fastFashionSection) {
    let activeTimers = [];

    function resetFastFashionAnimations() {
      // Clear all active timers
      activeTimers.forEach(timer => clearTimeout(timer));
      activeTimers = [];

      // Reset Brand Logo Stamp classes
      brandLogos.forEach(logo => logo.classList.remove('stamp-active'));

      // Reset Quick Pill Wave classes
      pillBadges.forEach(pill => {
        pill.classList.remove('wave-active');
        pill.style.animationDelay = '';
      });
    }

    const brandObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reset previous state before playing
          resetFastFashionAnimations();

          // Logo 1: Uniqlo (Flies in from LEFT WAY BIGGER, 200ms)
          activeTimers.push(setTimeout(() => {
            if (brandLogos[0]) brandLogos[0].classList.add('stamp-active');
          }, 200));

          // Logo 2: H&M (1.5s gap -> 1700ms)
          activeTimers.push(setTimeout(() => {
            if (brandLogos[1]) brandLogos[1].classList.add('stamp-active');
          }, 1700));

          // Logo 3: Levi's (1.5s gap -> 3200ms)
          activeTimers.push(setTimeout(() => {
            if (brandLogos[2]) brandLogos[2].classList.add('stamp-active');
          }, 3200));

          // 1.5s AFTER logos finish stamping (4700ms), start 2-cycle wave on the 3 pill badges!
          activeTimers.push(setTimeout(() => {
            pillBadges.forEach((pill, index) => {
              pill.style.animationDelay = (index * 220) + 'ms';
              pill.classList.add('wave-active');
            });
          }, 4700));

        } else {
          // Scrolled OUT of view -> Reset logos and wave so it plays again on scroll in!
          resetFastFashionAnimations();
        }
      });
    }, { threshold: 0.2 });

    brandObserver.observe(fastFashionSection);
  }

  // --- 12. INTERACTIVE GARMENT DEGRADATION SIMULATOR (IMAGE STAGES SHIRT 1 - 4) ---
  const shirtClickZone = document.getElementById('shirt-click-zone');
  const shirtImg = document.getElementById('shirt-img');
  const simStageTitle = document.getElementById('sim-stage-title');

  if (shirtClickZone && shirtImg && simStageTitle) {
    let currentStage = 1;

    const stagesInfo = {
      1: {
        imgSrc: "SHIRT 1.png",
        title: "Stage 1: Fresh & New Garment"
      },
      2: {
        imgSrc: "SHIRT 2.png",
        title: "Stage 2: Unrepairable Blends"
      },
      3: {
        imgSrc: "SHIRT 3.png",
        title: "Stage 3: Structurally Degraded"
      },
      4: {
        imgSrc: "SHIRT 4.png",
        title: "Stage 4: Intimate or Soiled Garment"
      }
    };

    function createClickRipple(e) {
      const rect = shirtClickZone.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const ripple = document.createElement('div');
      ripple.className = 'click-ripple-effect';
      ripple.style.left = clickX + 'px';
      ripple.style.top = clickY + 'px';

      shirtClickZone.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 750);
    }

    shirtClickZone.addEventListener('click', (e) => {
      createClickRipple(e);
      
      // Advance to next stage (1 -> 2 -> 3 -> 4 -> 1)
      currentStage = (currentStage % 4) + 1;
      
      const info = stagesInfo[currentStage];
      if (info) {
        shirtImg.src = info.imgSrc;
        shirtImg.alt = `Garment Degradation ${info.title}`;
        simStageTitle.textContent = info.title;
      }
    });
  }

});
