<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kashif Dawar – Your Vision, My Code</title>
  <style>
    /* ================= CSS Variables ================= */
    :root {
      --primary-color: #2575fc;
      --secondary-color: #6a11cb;
      --text-color: #2c3e50;
      --background-color: #f8f9fa;
      --card-bg: #ffffff;
      --shadow-color: rgba(0,0,0,0.08);
      --font-base: 'Arial', sans-serif;
      --radius: 15px;
      --transition-speed: 0.3s;
    }

    /* ================= Reset & Global ================= */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: var(--font-base); background: var(--background-color); color: var(--text-color); line-height: 1.6; scroll-behavior: smooth; }
    a { text-decoration: none; color: inherit; }
    h1, h2, h3 { font-weight: 700; }
    ul { list-style: none; padding-left: 0; }
    li { padding-left: 25px; margin-bottom: 12px; position: relative; }
    li::before { content: "✔️"; position: absolute; left: 0; }

    /* ================= Navbar ================= */
    .navbar {
      position: sticky;
      top: 0;
      background: white;
      display: flex;
      justify-content: center;
      gap: 30px;
      padding: 15px;
      box-shadow: 0 3px 15px var(--shadow-color);
      z-index: 999;
      transition: background var(--transition-speed);
    }
    .navbar a { font-weight: bold; color: var(--primary-color); transition: color var(--transition-speed); }
    .navbar a.active, .navbar a:hover { color: var(--secondary-color); }

    /* ================= Header ================= */
    .header {
      background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
      color: white;
      text-align: center;
      padding: 100px 20px 60px;
      border-radius: 0 0 50% 50% / 20%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .header__title { font-size: 3em; text-shadow: 1px 1px 6px rgba(0,0,0,0.2); }
    .header__subtitle { font-size: 1.2em; opacity: 0.85; }

    /* ================= Section ================= */
    .section {
      max-width: 1100px;
      margin: 40px auto;
      padding: 40px 30px;
      background: var(--card-bg);
      border-radius: var(--radius);
      box-shadow: 0 10px 25px var(--shadow-color);
      transition: transform var(--transition-speed), box-shadow var(--transition-speed);
    }
    .section:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.12); }
    .section__title {
      text-align: center;
      color: var(--primary-color);
      font-size: 2em;
      margin-bottom: 25px;
      position: relative;
    }
    .section__title::after {
      content: "";
      display: block;
      width: 60px;
      height: 3px;
      background: var(--primary-color);
      margin: 10px auto 0;
      border-radius: 2px;
    }

    /* ================= Tech Grid ================= */
    .tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
    .tech-card {
      background: linear-gradient(145deg, #ffffff, #e8f0fe);
      padding: 30px 20px;
      border-radius: var(--radius);
      text-align: center;
      box-shadow: 0 8px 20px var(--shadow-color);
      transition: transform var(--transition-speed), box-shadow var(--transition-speed);
    }
    .tech-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.12); }
    .tech-card__title { color: var(--primary-color); margin-bottom: 12px; font-size: 1.4em; }
    .tech-card__item { color: #34495e; margin-bottom: 6px; font-size: 0.95em; }

    /* ================= Skill Bars ================= */
    .skill-bar { margin: 15px 0; background: #e0e0e0; border-radius: var(--radius); overflow: hidden; height: 25px; }
    .skill-bar__fill {
      height: 100%;
      width: 0;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      color: white;
      font-weight: bold;
      border-radius: var(--radius);
      transition: width 1.5s ease-in-out;
    }

    /* ================= Portfolio ================= */
    .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
    .portfolio-card {
      background: var(--card-bg);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: 0 8px 20px var(--shadow-color);
      transition: transform var(--transition-speed), box-shadow var(--transition-speed);
      cursor: pointer;
    }
    .portfolio-card:hover { transform: translateY(-10px); box-shadow: 0 15px 35px rgba(0,0,0,0.12); }
    .portfolio-card img { width: 100%; display: block; }
    .portfolio-card__content { padding: 20px; }
    .portfolio-card__title { font-size: 1.2em; color: var(--primary-color); margin-bottom: 10px; }
    .portfolio-card__desc { font-size: 0.95em; color: #34495e; }

    /* ================= Buttons ================= */
    .btn {
      display: inline-block;
      background: var(--primary-color);
      color: #fff;
      border: none;
      padding: 15px 35px;
      border-radius: 50px;
      font-size: 1.1em;
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
      transition: background var(--transition-speed), transform var(--transition-speed);
    }
    .btn:hover { background: var(--secondary-color); transform: scale(1.05); }

    /* ================= Modal ================= */
    .modal {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.6);
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .modal.active { display: flex; }
    .modal-content {
      background: var(--card-bg);
      padding: 30px 20px;
      border-radius: var(--radius);
      max-width: 500px;
      width: 90%;
      text-align: center;
      position: relative;
    }
    .modal-close {
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
      font-size: 1.5em;
      font-weight: bold;
      color: var(--primary-color);
    }

    /* ================= Footer ================= */
    footer {
      text-align: center;
      padding: 30px 20px;
      font-size: 0.95em;
      color: #7f8c8d;
      background: #f1f3f6;
      border-radius: var(--radius);
      margin-top: 40px;
    }

    /* ================= Animations ================= */
    .fade-in { opacity: 0; transform: translateY(20px); transition: all 0.8s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }

    /* ================= Responsive ================= */
    @media(max-width:768px){
      .header__title { font-size: 2.2em; }
      .section { padding: 30px 20px; }
      .navbar { flex-direction: column; gap: 15px; }
    }
  </style>
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar">
    <a href="#about">About</a>
    <a href="#arsenal">Stack</a>
    <a href="#skills">Skills</a>
    <a href="#portfolio">Portfolio</a>
    <a href="#contact">Contact</a>
  </nav>

  <!-- Header -->
  <header class="header">
    <h1 class="header__title">Kashif Dawar – Your Vision, My Code</h1>
    <p class="header__subtitle">Full-Stack Web Development for Your Business</p>
    <p class="header__subtitle">Transforming innovative ideas into responsive, user-friendly web solutions.</p>
  </header>

  <!-- About Me -->
  <section class="section fade-in" id="about">
    <h2 class="section__title">About Me</h2>
    <ul>
      <li><strong>Experienced Developer:</strong> Hands-on experience building scalable, secure web applications.</li>
      <li><strong>Technical Proficiency:</strong> Mastery of frontend and backend technologies for seamless integration.</li>
      <li><strong>Problem Solver:</strong> Efficient solutions to complex development challenges.</li>
    </ul>
  </section>

  <!-- Full-Stack Arsenal -->
  <section class="section fade-in" id="arsenal">
    <h2 class="section__title">My Full-Stack Arsenal</h2>
    <div class="tech-grid">
      <div class="tech-card">
        <h3 class="tech-card__title">Frontend</h3>
        <p class="tech-card__item">HTML5, CSS3, JavaScript (ES6+)</p>
        <p class="tech-card__item">React, Angular, Vue.js</p>
        <p class="tech-card__item">Bootstrap, Material-UI</p>
      </div>
      <div class="tech-card">
        <h3 class="tech-card__title">Backend</h3>
        <p class="tech-card__item">Node.js, Python (Django/Flask), PHP (Laravel)</p>
        <p class="tech-card__item">RESTful APIs & Microservices</p>
        <p class="tech-card__item">Secure Authentication & Authorization</p>
      </div>
      <div class="tech-card">
        <h3 class="tech-card__title">Databases</h3>
        <p class="tech-card__item">SQL: PostgreSQL, MySQL, SQL Server</p>
        <p class="tech-card__item">NoSQL: MongoDB, Firebase, Cassandra</p>
        <p class="tech-card__item">Efficient data modeling & queries</p>
      </div>
    </div>
  </section>

  <!-- Skills -->
  <section class="section fade-in" id="skills">
    <h2 class="section__title">Skills</h2>
    <p>Interactive Skill Bars</p>
    <div class="skill-bar"><div class="skill-bar__fill" style="width: 90%;">HTML/CSS 90%</div></div>
    <div class="skill-bar"><div class="skill-bar__fill" style="width: 85%;">JavaScript 85%</div></div>
    <div class="skill-bar"><div class="skill-bar__fill" style="width: 80%;">React 80%</div></div>
    <div class="skill-bar"><div class="skill-bar__fill" style="width: 75%;">Node.js 75%</div></div>
  </section>

  <!-- Portfolio -->
  <section class="section fade-in" id="portfolio">
    <h2 class="section__title">Portfolio</h2>
    <div class="portfolio-grid">
      <div class="portfolio-card">
        <img src="https://via.placeholder.com/400x200" alt="Project 1">
        <div class="portfolio-card__content">
          <h3 class="portfolio-card__title">E-commerce Platform</h3>
          <p class="portfolio-card__desc">Secure online store with payment gateways, inventory management, and a seamless user experience.</p>
        </div>
      </div>
      <div class="portfolio-card">
        <img src="https://via.placeholder.com/400x200" alt="Project 2">
        <div class="portfolio-card__content">
          <h3 class="portfolio-card__title">SaaS Dashboard</h3>
          <p class="portfolio-card__desc">Real-time analytics dashboard for B2B software with customizable widgets.</p>
        </div>
      </div>
      <div class="portfolio-card">
        <img src="https://via.placeholder.com/400x200" alt="Project 3">
        <div class="portfolio-card__content">
          <h3 class="portfolio-card__title">Educational Portal</h3>
          <p class="portfolio-card__desc">Interactive learning platform with course tracking and multimedia content.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact / Call to Action -->
  <section class="section fade-in" id="contact" style="text-align:center;">
    <h2 class="section__title">Let's Build Something Amazing</h2>
    <button class="btn" onclick="openModal()">Contact Me</button>
  </section>

  <!-- Modal -->
  <div class="modal" id="contactModal">
    <div class="modal-content">
      <span class="modal-close" onclick="closeModal()">&times;</span>
      <h2>Contact Me</h2>
      <p>Email: kashifdawarkashi@gmail.com</p>
      <p>Phone: 03102681613</p>
      <p>Message: Ready to build your project!</p>
    </div>
  </div>

  <!-- Footer -->
  <footer>
    &copy; 2025 Kashif Dawar – Your Vision, My Code. All rights reserved.
  </footer>

  <script>
    // ================= Navbar Active Highlight =================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (pageYOffset >= sectionTop) current = section.getAttribute('id');
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) link.classList.add('active');
      });
    });

    // ================= Fade-in Scroll Animation =================
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.2 };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // ================= Contact Modal =================
    function openModal(){ document.getElementById('contactModal').classList.add('active'); }
    function closeModal(){ document.getElementById('contactModal').classList.remove('active'); }
  </script>

</body>
</html>
