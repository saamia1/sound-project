document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a');
    const contentSections = document.querySelectorAll('.content');
  
    function showSection(sectionId) {
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    }
  
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
  
    showSection('home');
    navLinks[0].classList.add('active');
  });
  
  // Mobile navigation toggle function
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
  }