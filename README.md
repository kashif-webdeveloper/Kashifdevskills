<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>Kashif Dawar | Full-Stack Web Development & Expert SEO Services</title>
  <meta name="description" content="Kashif Dawar: Full-Stack Developer & SEO Specialist. Building high-ranking, mobile-friendly websites with fast-loading, secure web solutions for your business.">
  <link rel="canonical" href="[YOUR_LIVE_URL_HERE]">
  
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

  <style>
    /* ================= CSS Variables ================= */
    :root {
      --primary-color: #2575fc;
      --secondary-color: #6a11cb;
      --text-color: #2c3e50;
      --background-color: #f8f9fa;
      --card-bg: #ffffff;
      --shadow-color: rgba(0,0,0,0.1);
      --font-base: 'Poppins', sans-serif;
      --radius: 15px;
      --white-text: #ffffff;
    }

    /* ================= Global Reset ================= */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: var(--font-base); background: var(--background-color); color: var(--text-color); line-height: 1.6; overflow-x: hidden; }
    a { text-decoration: none; color: inherit; }
    img { max-width: 100%; display: block; }
    ul { list-style: none; }

    /* ================= CRITICAL FIX: Navbar & Mobile Menu ================= */
    .navbar {
      position: sticky;
      top: 0;
      background: rgba(255, 255, 255, 0.98); /* Slightly more opaque to prevent see-through issues */
      padding: 15px 30px;
      box-shadow: 0 4px 20px var(--shadow-color);
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar__logo { font-size: 1.5em; font-weight: 700; color: var(--secondary-color); }
    
    /* Desktop Links */
    .nav-links { display: flex; gap: 30px; }
    .nav-links a { font-weight: 600; color: var(--primary-color); transition: 0.3s; }
    .nav-links a:hover { color: var(--secondary-color); }

    /* Hamburger Button */
    .menu-toggle { display: none; background: none; border: none; font-size: 2em; cursor: pointer; color: var(--primary-color); }

    /* MOBILE DRAWER FIX: Using 'fixed' prevents layout breaking */
    .nav-drawer {
      display: none; /* Hidden by default */
      position: fixed; 
      top: 70px; /* Below navbar */
      right: 0;
      width: 260px;
      height: auto;
      background: var(--card-bg);
      box-shadow: -5px 10px 20px rgba(0,0,0,0.1);
      padding: 20px;
      border-radius: 0 0 0 var(--radius);
      z-index: 999;
    }
    
    .nav-drawer.active { display: block; animation: slideIn 0.3s ease-out; }
    .nav-drawer a { display: block; padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: var(--text-color); }
    .nav-drawer a:last-child { border-bottom: none; }

    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

    @media(max-width: 768px) {
      .nav-links { display: none; }
      .menu-toggle { display: block; }
    }

    /* ================= Header (Hero) ================= */
    header.header { 
      background: linear-gradient(135deg, var(--secondary-color), var(--primary-color)); 
      color: var(--white-text); 
      text-align: center; 
      padding: 80px 20px 60px; 
      border-radius: 0 0 50% 50% / 15px; /* Subtle curve */
      margin-bottom: 40px;
    }
    .header__title { font-size: 2.8em; margin-bottom: 10px; text-shadow: 0 2px 10px rgba(0,0,0,0.2); }
    .header__subtitle { font-size: 1.1em; opacity: 0.9; max-width: 600px; margin: 0 auto; }

    /* ================= Sections ================= */
    main section { 
      max-width: 1100px; 
      margin: 0 auto 60px; 
      padding: 30px; 
      /* Removing card background from section itself for cleaner look on mobile */
    }
    .section__title { text-align: center; color: var(--primary-color); font-size: 2em; margin-bottom: 40px; font-weight: 700; }
    
    /* ================= Tech Grid (Arsenal) ================= */
    .tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
    .tech-card { 
      background: white; 
      padding: 25px; 
      border-radius: var(--radius); 
      box-shadow: 0 5px 15px var(--shadow-color); 
      text-align: center; 
      border-top: 4px solid var(--primary-color);
    }
    .tech-card__title { color: var(--secondary-color); margin-bottom: 15px; font-size: 1.3em; }
    .tech-card__item { color: #555; margin-bottom: 8px; font-size: 0.95em; }

    /* ================= FIXED Skill Bars (Contrast Issue) ================= */
    .skill-bar { 
      margin: 20px 0; 
      background: #e0e0e0; 
      border-radius: 20px; 
      overflow: hidden; 
      height: 35px; 
      position: relative; 
      box-shadow: inset 0 2px 5px rgba(0,0,0,0.1);
    }
    .skill-bar__text-overlay { 
      position: absolute; 
      width: 100%; 
      height: 100%; 
      display: flex; 
      align-items: center; 
      justify-content: space-between; 
      padding: 0 20px; 
      font-weight: 700; 
      z-index: 2; 
      /* FIX: White text with shadow for perfect readability */
      color: var(--white-text); 
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
    .skill-bar__fill { 
      height: 100%; 
      width: 0; 
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color)); 
      border-radius: 20px; 
      transition: width 1.5s ease-in-out; 
    }

    /* ================= Portfolio (Beautiful Content) ================= */
    .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
    .portfolio-card { 
      background: white; 
      border-radius: var(--radius); 
      overflow: hidden; 
      box-shadow: 0 10px 30px rgba(0,0,0,0.08); 
      transition: transform 0.3s; 
    }
    .portfolio-card:hover { transform: translateY(-5px); }
    .portfolio-card img { width: 100%; height: 220px; object-fit: cover; }
    .portfolio-card__content { padding: 25px; }
    .portfolio-card__title { font-size: 1.4em; color: var(--primary-color); margin-bottom: 15px; }

    /* The "Box Sequence" List Style */
    .project-box-list { margin-top: 15px; }
    .project-box-list li {
      background: #f8f9fa;
      border-left: 4px solid var(--secondary-color);
      padding: 10px 15px;
      margin-bottom: 10px;
      font-size: 0.9em;
      border-radius: 0 8px 8px 0;
    }
    .project-box-list strong { display: block; color: var(--text-color); font-weight: 700; }

    .portfolio-card__links { margin-top: 20px; display: flex; gap: 15px; }
    .link-btn { 
      font-size: 0.9em; font-weight: 600; color: var(--primary-color); border: 1px solid var(--primary-color); padding: 8px 15px; border-radius: 5px; transition: 0.3s; 
    }
    .link-btn:hover { background: var(--primary-color); color: white; }

    /* ================= Contact & Footer ================= */
    .btn-primary { 
      background: var(--primary-color); color: white; border: none; padding: 15px 40px; 
      border-radius: 50px; font-size: 1.1em; font-weight: 600; cursor: pointer; 
      box-shadow: 0 5px 15px rgba(37, 117, 252, 0.3); transition: 0.3s; 
    }
    .btn-primary:hover { background: var(--secondary-color); transform: scale(1.05); }

    .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); justify-content: center; align-items: center; z-index: 2000; }
    .modal.active { display: flex; }
    .modal-content { background: white; padding: 40px; border-radius: var(--radius); width: 90%; max-width: 400px; text-align: center; position: relative; }
    .close-modal { position: absolute; top: 15px; right: 20px; font-size: 1.5em; cursor: pointer; }

    footer { text-align: center; padding: 40px 20px; color: #888; font-size: 0.9em; background: #f1f3f6; }

    /* Animations */
    .fade-in { opacity: 0; transform: translateY(20px); transition: 0.8s; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
  </style>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kashif Dawar",
    "jobTitle": "Full-Stack Developer",
    "url": "[YOUR_URL]"
  }
  </script>
</head>
<body>

  <nav class="navbar">
    <div class="navbar__logo">Kashif Dawar</div>
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#arsenal">Stack</a>
      <a href="#skills">Skills</a>
      <a href="#portfolio">Portfolio</a>
      <a href="#contact">Contact</a>
    </div>
    <button class="menu-toggle" onclick="toggleMenu()">&#9776;</button>
    
    <div class="nav-drawer" id="mobile-drawer">
      <a href="#about" onclick="toggleMenu()">About Me</a>
      <a href="#arsenal" onclick="toggleMenu()">My Stack</a>
      <a href="#skills" onclick="toggleMenu()">Expertise</a>
      <a href="#portfolio" onclick="toggleMenu()">Projects</a>
      <a href="#contact" onclick="toggleMenu()">Get in Touch</a>
    </div>
  </nav>

  <header class="header">
    <h1 class="header__title">Full-Stack Web & SEO</h1>
    <p class="header__subtitle">I build **mobile-friendly**, **scalable** applications with a focus on **Technical SEO** and **Fast Loading** speeds.</p>
  </header>
  
  <main>
    <section class="fade-in" id="about">
      <h2 class="section__title">About Me</h2>
      <p style="text-align:center; max-width: 700px; margin: 0 auto; color: #555;">
        I am an experienced developer specializing in the MERN stack and SEO. I don't just write code; I solve business problems by creating software that ranks high on Google and converts visitors into customers.
      </p>
    </section>

    <section class="fade-in" id="arsenal">
      <h2 class="section__title">My Tech Arsenal</h2>
      <div class="tech-grid">
        <div class="tech-card">
          <h3 class="tech-card__title">Frontend</h3>
          <p class="tech-card__item">React.js / Next.js</p>
          <p class="tech-card__item">Tailwind CSS</p>
          <p class="tech-card__item">Redux Toolkit</p>
        </div>
        <div class="tech-card">
          <h3 class="tech-card__title">Backend</h3>
          <p class="tech-card__item">Node.js / Express</p>
          <p class="tech-card__item">Python / Django</p>
          <p class="tech-card__item">RESTful APIs</p>
        </div>
        <div class="tech-card">
          <h3 class="tech-card__title">Database & SEO</h3>
          <p class="tech-card__item">PostgreSQL / MongoDB</p>
          <p class="tech-card__item">Technical SEO</p>
          <p class="tech-card__item">Schema Markup</p>
        </div>
      </div>
    </section>

    <section class="fade-in" id="skills">
      <h2 class="section__title">Technical Expertise</h2>
      <div id="skill-bars-container"></div>
    </section>

    <section class="fade-in" id="portfolio">
      <h2 class="section__title">Featured Projects</h2>
      <div class="portfolio-grid">
        
        <article class="portfolio-card">
                    <img src="https://via.placeholder.com/400x220/2575fc/ffffff?text=E-Commerce+Store" alt="E-commerce Project">
          <div class="portfolio-card__content">
            <h3 class="portfolio-card__title">Fashion Store (E-Commerce)</h3>
            <ul class="project-box-list">
              <li><strong>Challenge:</strong> Slow load times causing high bounce rates.</li>
              <li><strong>Solution:</strong> Implemented Next.js SSR and image optimization.</li>
              <li><strong>Result:</strong> 95+ Google PageSpeed score and 40% more sales.</li>
            </ul>
            <div class="portfolio-card__links">
              <a href="#" class="link-btn">Live Demo</a>
              <a href="#" class="link-btn">GitHub Code</a>
            </div>
          </div>
        </article>

        <article class="portfolio-card">
                     <img src="https://via.placeholder.com/400x220/6a11cb/ffffff?text=Chat+Application" alt="Chat App Project">
          <div class="portfolio-card__content">
            <h3 class="portfolio-card__title">Real-Time Chat App</h3>
            <ul class="project-box-list">
              <li><strong>Challenge:</strong> Users needed instant communication features.</li>
              <li><strong>Solution:</strong> Built using Socket.io and Node.js for low latency.</li>
              <li><strong>Result:</strong> Seamless messaging with active status indicators.</li>
            </ul>
            <div class="portfolio-card__links">
              <a href="#" class="link-btn">Live Demo</a>
              <a href="#" class="link-btn">GitHub Code</a>
            </div>
          </div>
        </article>

        <article class="portfolio-card">
                     <img src="https://via.placeholder.com/400x220/2c3e50/ffffff?text=SEO+Dashboard" alt="SEO Tool Project">
          <div class="portfolio-card__content">
            <h3 class="portfolio-card__title">SEO Analytics Dashboard</h3>
            <ul class="project-box-list">
              <li><strong>Challenge:</strong> Clients struggled to visualize SEO data.</li>
              <li><strong>Solution:</strong> Created a MERN stack dashboard with Chart.js.</li>
              <li><strong>Result:</strong> Automated reporting saved 10 hours/week.</li>
            </ul>
            <div class="portfolio-card__links">
              <a href="#" class="link-btn">Live Demo</a>
              <a href="#" class="link-btn">GitHub Code</a>
            </div>
          </div>
        </article>

      </div>
    </section>

    <section class="fade-in" id="contact" style="text-align:center;">
      <h2 class="section__title">Ready to Start?</h2>
      <button class="btn-primary" onclick="openModal()">Contact Me</button>
    </section>
  </main>

  <div class="modal" id="contactModal">
    <div class="modal-content">
      <span class="close-modal" onclick="closeModal()">&times;</span>
      <h2>Contact Details</h2>
      <p style="margin-top:15px;"><strong>Email:</strong> kashifdawarkashi@gmail.com</p>
      <p><strong>Phone:</strong> +92-310-2681613</p>
    </div>
  </div>

  <footer>
    &copy; 2025 Kashif Dawar. Built with ❤️ and Code.
  </footer>

  <script>
    // Mobile Menu Toggle
    function toggleMenu() {
      document.getElementById('mobile-drawer').classList.toggle('active');
    }

    // Modal Logic
    function openModal() { document.getElementById('contactModal').classList.add('active'); }
    function closeModal() { document.getElementById('contactModal').classList.remove('active'); }

    // Scroll Animations
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
      });
    });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Skill Bars Logic
    const skills = [
      { name: "HTML/CSS (Semantic)", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "React/Next.js", level: 85 },
      { name: "Node.js/Express", level: 80 },
      { name: "PostgreSQL/MongoDB", level: 75 },
      { name: "Git & Deployment", level: 70 }
    ];

    const container = document.getElementById('skill-bars-container');
    
    skills.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'skill-bar';
      div.innerHTML = `
        <div class="skill-bar__text-overlay">
          <span>${skill.name}</span>
          <span>${skill.level}%</span>
        </div>
        <div class="skill-bar__fill" data-width="${skill.level}%"></div>
      `;
      container.appendChild(div);
    });

    // Animate Skills on Scroll
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-bar__fill').forEach(fill => {
            fill.style.width = fill.dataset.width;
          });
        }
      });
    });
    document.querySelectorAll('.skill-bar').forEach(bar => skillObserver.observe(bar));
  </script>

</body>
</html>
