import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const splineRef = useRef(null);

  useEffect(() => {
    const onLoad = (spline) => {
      console.log('Spline loaded', spline);
      const Keyboard = spline.findObjectByName('iPhone14Pro');
       
      if (!Keyboard || !iPhone14Pro) {
        console.error('Keyboard or iPhone14Pro object not found in the scene');
        return;
      }
    
      gsap.set(Keyboard.scale, { x: 1, y: 1, z: 1 });
      gsap.set(Keyboard.position, { x: 110, y: 50 });

      const rotateKeyboard = gsap.to(Keyboard.rotation, {
        y: Math.PI * 2 + Keyboard.rotation.y,
        x: 0,
        z: 0,
        duration: 10,
        repeat: -1,
        ease: "none",
        paused: true
      });

      let interval;

      gsap.timeline({
        scrollTrigger: {
          trigger: "#part1",
          start: "top 60%",
          end: "bottom bottom",
          scrub: true,
          onEnter: () => {
            console.log(' part1');
            interval = setInterval(() => {
              console.log('Key Down Event');
            }, 1500);
            rotateKeyboard.pause();
            gsap.to(Keyboard.rotation, { y: Math.PI / 12, duration: 10});
          },
          onLeaveBack: () => {
            console.log('Leaving part1');
            rotateKeyboard.resume();
            clearInterval(interval);
          }
        }
      })
      .to(Keyboard.rotation, { x: -Math.PI / 14, z: Math.PI / 36 }, 0)
      .to(Keyboard.position, { x: -500, y: -200 }, 0)
      .to(Keyboard.scale, { x: 3, y: 3, z: 3 }, 0);

      gsap.timeline({
        scrollTrigger: {
          trigger: "#part2",
          start: "top bottom",
          end: "center bottom",
          scrub: true,
          onEnter: () => clearInterval(interval),
          onLeaveBack: () => clearInterval(interval)
        }
      })
      .to(Keyboard.rotation, { x: Math.PI / 36, y: -Math.PI / 10 }, 0)
      .to(Keyboard.position, { x: 150, y: 50 }, 0)
      .to(Keyboard.scale, { x: 0.8, y: 0.8, z: 0.8 }, 0);

      gsap.timeline({
        scrollTrigger: {
          trigger: "#part3",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      })
      .to(Keyboard.position, { x: 0, y: 0 }, 0);
    };

    let handleLoad = (event) => {
      let { spline } = event.detail;
      onLoad(spline);
    };

    if (splineRef.current) {
      splineRef.current.addEventListener('load', handleLoad);
    }

    let animateBar = (triggerElement, onEnterWidth, onLeaveBackWidth) => {
      gsap.to(".bar", {
        scrollTrigger: {
          trigger: triggerElement,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
          onEnter: () => gsap.to(".bar", { width: onEnterWidth, duration: 0.2, ease: "none" }),
          onLeaveBack: () => gsap.to(".bar", { width: onLeaveBackWidth, duration: 0.2, ease: "none" })
        }
      });
    };

    



    const animateCanvasCont = (triggerElement, onEnterX, onLeaveBackX,  onEnterScale, onLeaveBackScale) => {
      gsap.to(".canvas-cont", {
        scrollTrigger: {
          trigger: triggerElement,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
          onEnter: () => gsap.to(".canvas-cont", { x: onEnterX, scale: onEnterScale,duration: 0.2, ease: "none" }),
          onLeaveBack: () => gsap.to(".canvas-cont", { x: onLeaveBackX, scale: onLeaveBackScale, duration: 0.2, ease: "none" })
        }
      });
    };

    animateBar("#part1", "42%", "0%");
    animateBar("#part2", "65%", "42%");
    animateBar("#part3", "100%", "65%");

    animateCanvasCont("#part1", "-40%", "0%",);
    animateCanvasCont("#part2", "-10%", "-40%",);
    animateCanvasCont("#part3", "-10%", "10%",0.7,1);

  }, []);
    
  useEffect(() => {
    const keys = document.querySelectorAll(".key");
    const pressRandomKey = () => {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      randomKey.style.animation = "pressDown 0.2s ease-in-out";
      randomKey.onanimationend = () => {
        randomKey.style.animation = "";
        setTimeout(pressRandomKey, 100 + Math.random() * 300);
      };
    };
    pressRandomKey();
  }, []);

return (
    <div className="container">
      <div className="bar"></div>
      <div className="canvas-cont">
        <Spline
          ref={splineRef}
          className="canvas3d"
          scene="https://prod.spline.design/ngNoue-C9HKLWQei/scene.splinecode"
          width={1026}
          height={932}
                 
        />
      </div>

      <div id="hero" className="flex row">
        <h1 className='h12'>
            WELCOME
          <br />
          TO
          <br />
          <div className="keyboard">     
            <span className="key">S</span>
            <span className="key">O</span>
            <span className="key">F</span>
            <span className="key">T</span>
            <span className="key">G</span>
            <span className="key">E</span>
            <span className="key">N</span>
          </div>
        </h1>
      </div>

      <div id="part1" className="flex row">
        <div></div>
        <div className="part1-info flex column">
          <h2 className='h2'>about us</h2>
          <p className='p'>
            With these keyboards, you'll get proper bounce, a bit of <em>click</em>, and lots of satisfaction.
          </p>
          <button className='button'>read more</button>
        </div>
      </div>

      <div id="part2" className="flex row">
        <div className="part2-info flex column">
          <h2 className='h3'>CUSTOMIZE ALL THE WAY.</h2>
          <p className='h3'>
            It's all yours! Change the colors as you like. Make them purple, green, red, anything.
          </p>
          <button>Customize a Keyboard</button>
        </div>
        <div></div>
      </div>
      <div id="part3" className="flex column">
      <div className="part1-info flex column">
          <h2 className='h2'>contact us</h2>
          <p className='p'>
            With these keyboards, you'll get proper bounce, a bit of <em>click</em>, and lots of satisfaction.
            It's all yours! Change the colors as you like. Make them purple, green, red, anything.
          </p>
          
        </div>
        <br/>
        <br/>
        <br/>
        <h2 className='h21'>softgen</h2>
        <a className='a3' href="#" target="_blank" rel="noopener noreferrer">
          softgen
        </a>
      </div>
    </div>
  );
};

export default Home;
