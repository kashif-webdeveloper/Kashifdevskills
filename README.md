<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kashif Dawar | Full-Stack Web Development & Expert SEO Services</title>
  
  <meta name="description" content="Kashif Dawar: Full-Stack Developer & SEO Specialist. Building high-ranking, mobile-friendly websites with fast-loading, secure web solutions for your business.">
  
  <meta name="keywords" content="Kashif Dawar, Full-Stack Developer, Web Development, React, Node.js, Technical SEO, Site Speed, Mobile-Friendly, Web Solutions, Portfolio">
  
  <link rel="canonical" href="[YOUR_LIVE_URL_HERE]">
  
  <meta name="robots" content="index, follow">
  
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
/* Added relative positioning to parent skill-bar to correctly position the text */
.skill-bar { margin: 15px 0; background: #e0e0e0; border-radius: var(--radius); overflow: hidden; height: 25px; position: relative; }

/* Modified skill-bar__fill to remove text alignment and rely on inner span */
.skill-bar__fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  /* Removed flex properties here */
  /* color: white; <-- Text color now managed by separate element */
  font-weight: bold;
  border-radius: var(--radius);
  transition: width 1.5s ease-in-out;
}

/* New style for the text overlay to ensure visibility */
.skill-bar__text {
  position: absolute;
  top: 0;
  right: 10px; /* Aligned to the right edge of the parent bar */
  height: 100%;
  line-height: 25px; /* Centers text vertically */
  font-weight: bold;
  color: var(--text-color); /* Default text color */
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.5); /* Slight shadow for visibility */
  z-index: 2; /* Ensures text is on top of the fill */
}

/* Style for text that is covered by the fill */
.skill-bar__fill .skill-bar__text {
  color: white;
  text-shadow: none;
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
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kashif Dawar",
    "url": "[YOUR_LIVE_URL_HERE]",
    "email": "kashifdawarkashi@gmail.com",
    "jobTitle": "Full-Stack Web Developer & SEO Specialist",
    "description": "Expert in building scalable web applications and mastering technical SEO for higher organic traffic.",
    "sameAs": [
      "https://www.linkedin.com/in/kashif-dawar",
      "https://github.com/kashifdawar"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-310-2681613",
      "contactType": "Personal"
    }
  }
  </script>
</head>
<body>
  
  <nav class="navbar">
    <a href="#about" title="About Kashif Dawar, Full-Stack Developer and SEO Specialist">About</a>
    <a href="#arsenal" title="Kashif's Full-Stack Arsenal and Tech Stack">Stack</a>
    <a href="#skills" title="Kashif Dawar's Technical Skills and SEO Expertise">Skills</a>
    <a href="#portfolio" title="Kashif Dawar's Development Portfolio">Portfolio</a>
    <a href="#contact" title="Contact Kashif Dawar for web development projects">Contact</a>
  </nav>
  
  <header class="header">
    <h1 class="header__title">Kashif Dawar – Full-Stack Web Development & Expert SEO</h1>
    <p class="header__subtitle">Transforming innovative ideas into responsive, **Mobile-Friendly** web solutions with **Technical SEO** focus.</p>
    <p class="header__subtitle">Specializing in building **scalable, secure** applications with a **Fast Loading** experience.</p>
  </header>
  
  <section class="section fade-in" id="about">
    <h2 class="section__title">About Me: Your SEO-Conscious Developer</h2>
    <ul>
      <li><strong>Experienced Developer:</strong> Hands-on experience building **scalable, secure** web applications with a focus on **Crawlability and Indexability**.</li>
      <li><strong>Technical Proficiency:</strong> Mastery of frontend and backend technologies for seamless integration and **site speed** optimization.</li>
      <li><strong>Problem Solver:</strong> Efficient solutions to complex development challenges, leveraging analytics for **improved conversion rate**.</li>
    </ul>
    <p style="text-align: center; margin-top: 20px;">
      Discover the tools I use in my <a href="#arsenal" title="View Kashif's Full-Stack Arsenal">Full-Stack Arsenal</a>.
    </p>
  </section>
  
  <section class="section fade-in" id="arsenal">
    <h2 class="section__title">My Full-Stack Arsenal for High-Ranking Websites</h2>
    <div class="tech-grid">
      <div class="tech-card">
        <h3 class="tech-card__title">Frontend & Performance</h3>
        <p class="tech-card__item">HTML5, CSS3, JavaScript (ES6+)</p>
        <p class="tech-card__item">React, Angular, Vue.js (Focused on **Fast Loading**)</p>
        <p class="tech-card__item">Bootstrap, Material-UI (Ensuring **Mobile-Friendliness**)</p>
      </div>
      <div class="tech-card">
        <h3 class="tech-card__title">Backend & Security</h3>
        <p class="tech-card__item">Node.js, Python (Django/Flask), PHP (Laravel)</p>
        <p class="tech-card__item">RESTful APIs & Microservices</p>
        <p class="tech-card__item">Secure Authentication & Authorization (**HTTPS** principles)</p>
      </div>
      <div class="tech-card">
        <h3 class="tech-card__title">Databases & Structured Data</h3>
        <p class="tech-card__item">SQL: PostgreSQL, MySQL, SQL Server</p>
        <p class="tech-card__item">NoSQL: MongoDB, Firebase, Cassandra</p>
        <p class="tech-card__item">Efficient data modeling & **Schema Markup** implementation</p>
      </div>
    </div>
  </section>
  
  <section class="section fade-in" id="skills">
    <h2 class="section__title">Technical Skills & SEO Expertise</h2>
    <p>Interactive Skill Bars (Including key SEO-related skills)</p>
    
    <div class="skill-bar">
      <div class="skill-bar__fill" style="width: 90%;"><span class="skill-bar__text">HTML/CSS (On-Page SEO) 90%</span></div>
      <span class="skill-bar__text">HTML/CSS (On-Page SEO) 90%</span>
    </div>  
    <div class="skill-bar">
      <div class="skill-bar__fill" style="width: 85%;"><span class="skill-bar__text">JavaScript (Technical SEO) 85%</span></div>
      <span class="skill-bar__text">JavaScript (Technical SEO) 85%</span>
    </div>
    <div class="skill-bar">
      <div class="skill-bar__fill" style="width: 80%;"><span class="skill-bar__text">React (SPA Optimization) 80%</span></div>
      <span class="skill-bar__text">React (SPA Optimization) 80%</span>
    </div>
    <div class="skill-bar">
      <div class="skill-bar__fill" style="width: 75%;"><span class="skill-bar__text">Node.js (Backend & API Speed) 75%</span></div>
      <span class="skill-bar__text">Node.js (Backend & API Speed) 75%</span>
    </div>

    <p style="text-align: center; margin-top: 20px;">
      Ready to see my work? Check out my <a href="#portfolio" title="View Kashif's Portfolio Projects">Portfolio</a>.
    </p>
  </section>
  
  <section class="section fade-in" id="portfolio">
    <h2 class="section__title">Portfolio: Projects Optimized for Organic Traffic</h2>
    <div class="portfolio-grid">
      <div class="portfolio-card">
        <img src="https://via.placeholder.com/400x200" loading="lazy" alt="Mobile-friendly E-commerce platform optimized for SEO and fast loading">
        <div class="portfolio-card__content">
          <h3 class="portfolio-card__title">E-commerce Platform (**Improved Conversion Rate**)</h3>
          <p class="portfolio-card__desc">Secure online store with payment gateways, inventory management, and a seamless, high-performance user experience, designed for maximum **organic traffic**.</p>
        </div>
      </div>
      <div class="portfolio-card">
        <img src="https://via.placeholder.com/400x200" loading="lazy" alt="SaaS Dashboard built with React, focusing on technical SEO practices and page speed">
        <div class="portfolio-card__content">
          <h3 class="portfolio-card__title">SaaS Dashboard (**Real-Time Analytics**)</h3>
          <p class="portfolio-card__desc">Real-time analytics dashboard for B2B software with customizable widgets, ensuring fast loading and **low bounce rate** through best **technical SEO practices**.</p>
        </div>
      </div>
      <div class="portfolio-card">
        <img src="https://via.placeholder.com/400x200" loading="lazy" alt="Educational Portal with excellent crawlability and SERP optimization">
        <div class="portfolio-card__content">
          <h3 class="portfolio-card__title">Educational Portal (**Mobile-Friendly** Design)</h3>
          <p class="portfolio-card__desc">Interactive learning platform with course tracking and multimedia content, built with excellent **Crawlability and Indexability** for great **SERP optimization**.</p>
        </div>
      </div>
    </div>
  </section>
  
  <section class="section fade-in" id="contact" style="text-align:center;">
    <h2 class="section__title">Let's Build Something Amazing and Rank It High</h2>
    <button class="btn" onclick="openModal()">Contact Me for SEO Consultation</button>
  </section>
  
  <div class="modal" id="contactModal">
    <div class="modal-content">
      <span class="modal-close" onclick="closeModal()">&times;</span>
      <h2>Contact Me</h2>
      <p>Email: example@gmail.com</p>
      <p>Phone: 0000</p>
      <p>Message: Ready to build your project!</p>
    </div>
  </div>
  
  <footer>
    &copy; 2025 Kashif Dawar – Expert **Full-Stack Development** & **SEO** Services. All rights reserved.
  </footer>
  
  <script>
    // ================= Navbar Active Highlight =================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    window.addEventListener('scroll', () => {
      let current = '';
      const offset = 60; // Reduced section offset
      sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
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
      
    // ================= SEO Enhancement: Animate Skill Bars on Load =================
    document.addEventListener('DOMContentLoaded', () => {
        const skillBars = document.querySelectorAll('.skill-bar__fill');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = width;
        });
    });
  </script>
</body>
</html>
