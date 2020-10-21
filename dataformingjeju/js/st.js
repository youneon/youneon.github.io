(() => {

    let yOffset = 0; // pageY Offset var
    let prevScrollHeight = 0; // scroll height sum 
    let currentScene = 0; // ativated scene
    let startScene = false; // when scene is started = true

    const sceneInfo = [
        {
            //0
            type: 'sticky',
            heightNum: 5, //device height *5
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.phrases-a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.phrases-b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.phrases-c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.phrases-d'),
                canvas : document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages: []
            },
            values: {
                videoImageCount: 380,
                imageSequence: [0, 379],
                messageA_opacity_in: [0, 1, { start: 0.0, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },
        {
            //1
            type: 'normal',
            heightNum: 5, //device height *5
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .phrases-a'),
                messageB: document.querySelector('#scroll-section-2 .phrases-b'),
                messageC: document.querySelector('#scroll-section-2 .phrases-c'),
                pinB: document.querySelector('#scroll-section-2 .phrases-b .pin'),
                pinC: document.querySelector('#scroll-section-2 .phrases-c .pin')
            },
            values: {
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
                messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
                messageA_opacity_in: [0, 1, { start: 0.2, end: 0.3 }],
                messageB_opacity_in: [0, 1, { start: 0.49, end: 0.65 }],
                messageC_opacity_in: [0, 1, { start: 0.67, end: 0.92 }],
                messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
                messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
                messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
                messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
                messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
                messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
                pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
                pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
                canvasCaption: document.querySelector('.canvas-caption')
            },
            values: {
    
            }
        }
    ];

   
    function setCanvasImages() {
		let imgElem;
		for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
			imgElem = new Image();
			imgElem.src = `./video/002/scene0${110 + i}.jpg`;
			sceneInfo[0].objs.videoImages.push(imgElem);
        }
        
	}


    function setLayout() {
          // each scroll height
          for (let i = 0; i < sceneInfo.length; i++) {
              if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
              } else if (sceneInfo[i].type === 'normal') {
               sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
              }
              sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
            } 

          yOffset = window.pageYOffset;

          let totalScrollHeight = 0;
          for (let i = 0; i < sceneInfo.length; i++) {
              totalScrollHeight += sceneInfo[i].scrollHeight;
              if (totalScrollHeight >= yOffset) {
                  currentScene = i;
                  break;
              }
          }
          
          document.body.setAttribute('id', `show-scene-${currentScene}`);

          const heightRatio = window.innerHeight / 1080;
          sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50, 0) scale(${heightRatio})`

    }
    
    function calcValues(values, currentYOffset) {
        let rv;
        // present scecen and scrolled area scroll-ratio

        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        
        if (values.length === 3) {
            // between start to end scroll-ratio 
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if (currentYOffset < partScrollStart) {
                rv = values[0];
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }
            
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0]; 
        }
        
        
        return rv;
    }
    
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;


        switch (currentScene) {
            case 0:
                // console.log('0 play');
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);

                if (scrollRatio <= 0.12) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
    
                break;
        }
    }




    function scrollLoop() {
        startScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;     
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            startScene = true;
            currentScene ++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            startScene = true;
            if (currentScene === 0) return;
            currentScene --;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (startScene) return;
        
        playAnimation();
    }
 
    
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

    setCanvasImages();

})();