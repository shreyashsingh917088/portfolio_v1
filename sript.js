 document.addEventListener('DOMContentLoaded', function(){
  // Typing animation for the hero heading
  const text = "Hi, I'm Shreyash Singh — Web Developer";
  const heading = document.querySelector('.typing');
  let i = 0;
  function typeNext(){
    if(i <= text.length){
      heading.innerHTML = '<span class="typewriter">' + text.slice(0,i) + '</span>';
      i++;
      setTimeout(typeNext, 40);
    } else {
      // leave the final state (remove cursor)
      heading.innerHTML = '<span>' + text + '</span>';
    }
  }
  typeNext();

  // Theme toggle (simple)
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', () => {
    if(document.documentElement.style.getPropertyValue('--bg') === '#0f1724' || !document.documentElement.style.getPropertyValue('--bg')){
      document.documentElement.style.setProperty('--bg', '#f6f7fb');
      document.body.style.color = '#0b1220';
      themeBtn.textContent = '☀️';
    } else {
      document.documentElement.style.setProperty('--bg', '#0f1724');
      document.body.style.color = '#E6EEF3';
      themeBtn.textContent = '🌙';
    }
  });

  // User type chips
  const chips = document.querySelectorAll('.chip');
  const selectedTypeEl = document.getElementById('selectedType');
  let selectedType = 'Visitor';
  function setActiveChip(type){
    chips.forEach(c => {
      if(c.dataset.type === type) c.classList.add('active');
      else c.classList.remove('active');
    });
    selectedType = type;
    selectedTypeEl.innerHTML = 'Selected: <strong>' + type + '</strong>';
  }
  chips.forEach(chip => {
    chip.addEventListener('click', () => setActiveChip(chip.dataset.type));
  });
  setActiveChip('Visitor');

  // Simple form handling
  const form = document.getElementById('contactForm');
  const notice = document.getElementById('formNotice');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if(!name || !email) {
      notice.textContent = 'Please fill name and email.';
      notice.style.color = '#ffcc00';
      return;
    }
    notice.textContent = 'Thanks ' + name + ' — your message has been received as a ' + selectedType + '. (Demo only)';
    notice.style.color = '#9fe6b5';
    form.reset();
    setActiveChip('Visitor');
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
});
""")

# Create projects folder and 3 project pages
projects_dir = base / "projects"
projects_dir.mkdir(exist_ok=True)

project_template = textwrap.dedent("""
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{title} — Project</title>
  <link href="../css/style.css" rel="stylesheet" />
</head>
<body>
  <header class="nav">
    <div class="container nav-inner">
      <div class="brand">
        <img src="../assets/profile.jpg" alt="logo" class="logo-img" />
        <div class="brand-text"><h1>SHREYASH SINGH</h1></div>
      </div>
      <nav class="menu">
        <a href="../index.html">Home</a>
        <a href="../index.html#projects">Projects</a>
      </nav>
    </div>
  </header>

  <main class="container section">
    <h2>{title}</h2>
    <p class="muted">{description}</p>
    <div class="card" style="margin-top:1rem;">
      <h3>Live Demo</h3>
      <p>This is a demo project page. Replace this area with an iframe, screenshots, or an actual demo.</p>
      <div style="margin-top:1rem;">
        <a class="btn" href="#" onclick="alert('Demo clicked — replace link with real demo')">Open Demo</a>
        <a class="btn ghost" href="#" onclick="alert('Code clicked — link to GitHub')">View Code</a>
      </div>
    </div>

    <section style="margin-top:1.2rem;">
      <h3 id="details">Project Details</h3>
      <p>This section explains the project, the stack used, features and any screenshots. Update with real content.</p>
      <a href="../index.html" class="btn-small" style="margin-top:1rem;">← Back to Portfolio</a>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="muted">© 2025 SHREYASH SINGH</div>
    </div>
  </footer>
</body>
</html>
""")