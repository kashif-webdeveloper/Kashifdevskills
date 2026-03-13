    // Toggle Menu Logic
    function toggleMenu() { document.getElementById("drawer").classList.toggle("active"); }
    
    // Toggle Read More Logic
    function toggleAbout() {
      const content = document.getElementById('about-content');
      const btn = document.getElementById('about-btn');
      content.classList.toggle('expanded');
      
      if(content.classList.contains('expanded')){
        btn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
      } else {
        btn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
      }
    }

    // Scroll Animation
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".fade-in").forEach(el=>observer.observe(el));

    // Skills Animation
    const skills = [
      { name: "HTML/CSS", level: 95 }, { name: "JavaScript", level: 90 },
      { name: "React/Next.js", level: 88 }, { name: "Node.js", level: 82 },
      { name: "PostgreSQL", level: 78 }, { name: "Technical SEO", level: 92 }
    ];
    const container = document.getElementById("skill-bars-container");
    skills.forEach(s=>{
      container.innerHTML += `<div class="skill-bar"><div class="skill-bar__text-overlay"><span class="skill-name">${s.name}</span><span>${s.level}%</span></div><div class="skill-bar__fill" data-level="${s.level}" style="width:0%"></div></div>`;
    });

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-bar__fill');
          fills.forEach((fill, i) => {
            setTimeout(() => {
              fill.style.width = fill.getAttribute('data-level') + '%';
            }, i * 200);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillObserver.observe(container);
