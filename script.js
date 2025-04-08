document.addEventListener('DOMContentLoaded', () => {
    // Create fog
    const fog = document.createElement('div');
    fog.className = 'fog-layer';
    document.body.appendChild(fog);
  
    // Thunder and flash
    function triggerThunder() {
      document.body.classList.add('lightning-flash');
      const sound = new Audio('https://www.soundjay.com/nature/thunder-01.mp3');
      sound.volume = 0.3;
      sound.play();
      setTimeout(() => {
        document.body.classList.remove('lightning-flash');
      }, 150);
    }
  
    setInterval(() => {
      if (Math.random() > 0.7) {
        triggerThunder();
      }
    }, 4000);
  });
  