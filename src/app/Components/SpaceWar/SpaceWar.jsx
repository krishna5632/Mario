"use client"; 

import React, { useRef, useEffect, useState } from 'react';

const StarfieldEffect = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateCanvasSize(); 

   
    const container = containerRef.current;
    if (container) {
      container.addEventListener('resize', updateCanvasSize);
    }

   
    return () => {
      if (container) {
        container.removeEventListener('resize', updateCanvasSize);
      }
    };
  }, []);

  useEffect(() => {
    const outerspace = canvasRef.current;
    const mainContext = outerspace.getContext('2d');

    const canvasWidth = dimensions.width;
    const canvasHeight = dimensions.height;

    if (canvasWidth === 0 || canvasHeight === 0) return; 

    const centerX = canvasWidth * 0.5;
    const centerY = canvasHeight * 0.5;

    const numberOfStars = 500;
    let stars = [];

    const frames_per_second = 60;
    const interval = Math.floor(1000 / frames_per_second);
    let startTime = performance.now();
    let previousTime = startTime;

    let currentTime = 0;
    let deltaTime = 0;

    class Star {
      constructor() {
        this.x = getRandomInt(-centerX, centerX);
        this.y = getRandomInt(-centerY, centerY);
        this.counter = getRandomInt(1, canvasWidth);

        this.radiusMax = 1 + Math.random() * 10;
        this.speed = getRandomInt(8, 20);
      }

      drawStar() {
        this.counter -= this.speed;

        if (this.counter < 1) {
          this.counter = canvasWidth;
          this.x = getRandomInt(-centerX, centerX);
          this.y = getRandomInt(-centerY, centerY);

          this.radiusMax = getRandomInt(1, 10);
          this.speed = getRandomInt(1, 5);
        }

        const xRatio = this.x / this.counter;
        const yRatio = this.y / this.counter;

        const starX = remap(xRatio, 0, 1, 0, canvasWidth);
        const starY = remap(yRatio, 0, 1, 0, canvasHeight);

        const radius = remap(this.counter, 0, canvasWidth, this.radiusMax, 0);

        mainContext.beginPath();
        mainContext.arc(starX, starY, radius, 0, Math.PI * 2, false);
        mainContext.closePath();
        mainContext.fillStyle = '#FFF';
        mainContext.fill();
      }
    }

    function setup() {
      for (let i = 0; i < numberOfStars; i++) {
        const star = new Star();
        stars.push(star);
      }
    }
    setup();

    function draw(timestamp) {
      currentTime = timestamp;
      deltaTime = currentTime - previousTime;

      if (deltaTime > interval) {
        previousTime = currentTime - (deltaTime % interval);

        mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
        mainContext.fillStyle = '#111';
        mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

        mainContext.save();
        mainContext.translate(centerX, centerY);

        stars.forEach((star) => {
          star.drawStar();
        });

        mainContext.restore();
      }

      requestAnimationFrame(draw);
    }
    draw();

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function remap(value, istart, istop, ostart, ostop) {
      return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    }

    
    return () => {
      cancelAnimationFrame(draw);
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100vw', height: '100vh', position: 'relative' }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ display: 'block', background: '#111' }}
      />
    </div>
  );
};

export default StarfieldEffect;
