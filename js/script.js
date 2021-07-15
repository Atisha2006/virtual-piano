	const keys = Array.from(document.querySelectorAll('.piano-key'));
		
	window.addEventListener('keydown', (event) => {
		const letter = event.code[event.code.length - 1];
	    const key = document.querySelector(`div[data-letter=${letter}]`);
	    if(key && !event.repeat){
		    const note = key.dataset.note;
	        const src = `assets/audio/${note}.mp3`;
	        playAudio(src);
	        key.classList.add('active');
	        window.addEventListener('keyup',(e) =>{
	        	const letterUp = e.code[e.code.length - 1];
	        	const keyUp = document.querySelector(`div[data-letter=${letterUp}]`);
				window.setTimeout(() => keyUp.classList.remove('active'), 100);
			});
	    } else return;	  
	});

	keys.forEach((key) => key.addEventListener('mousedown', (event) => {
		if(event.target.classList.contains('piano-key')){
			playSound();
			keys.forEach(key => {
				key.addEventListener('mouseover', playSound);
			})	
			document.addEventListener('mouseup',() =>{
				keys.forEach(key => {
					window.setTimeout(() => key.classList.remove('active'), 100);
					key.removeEventListener('mouseover', playSound);
				});
			});
		}
	}));

	function playSound() {
		const note = event.target.dataset.note;
		const src = `assets/audio/${note}.mp3`;
		playAudio(src);
		addActive(event);
	}

	function playAudio(src) {
		const audio = new Audio();
		audio.src = src;
		audio.currentTime = 0;
		audio.play();
	}

	function addActive(event){
		keys.forEach((el) => {
	      if(el.classList.contains('active')) {
	        el.classList.remove('active');
	      }
	    });
	    event.target.classList.add('active');
	}

	const buttons = Array.from(document.querySelectorAll('.btn'));
	buttons.forEach((button) => button.addEventListener('click', (event) => {
		buttons.forEach((el) => {
	      if(el.classList.contains('btn-active')) {
	        el.classList.remove('btn-active');
	      }
	    });
	    event.target.classList.add('btn-active');
	    if(event.target.classList.contains('btn-letters')) {
	    	keys.forEach((el) => {
		      el.classList.add('letter');
		    });
	    } else {
	    	keys.forEach((el) => {
		      el.classList.remove('letter');
		    });
	    }
	}));

	document.querySelector('.fullscreen').onclick = function (event) {
	  if (document.fullscreenElement) {
	    document.exitFullscreen();
	    event.target.classList.remove('openfullscreen');
	  } else {
	    document.documentElement.requestFullscreen();
	    event.target.classList.add('openfullscreen');
	  }
	}