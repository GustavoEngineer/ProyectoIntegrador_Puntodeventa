import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import MedicalPartModel from './MedicalPartModel';
import './HeroSection.css';

// Note: Navbar is now managed by App.jsx, not here
export default function HeroSection({ onLoginClick }) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
    const containerRef = useRef(null);
    const lenisRef = useRef(null);

    useEffect(() => {
        // Inicializar Lenis para smooth scroll
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        // RAF loop para Lenis
        function raf(time) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Listener de scroll para calcular progreso
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Progreso de 0 a 1 basado en el scroll del hero
            const progress = Math.min(scrollY / windowHeight, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Animación inicial después de 800ms para dar tiempo a cargar texturas
        const timer = setTimeout(() => {
            setInitialAnimationComplete(true);
        }, 800);

        return () => {
            lenisRef.current?.destroy();
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    return (
        <section ref={containerRef} className="hero-fullscreen">
            {/* Modelo 3D más visible y con animación inicial */}
            <div
                className={`hero-model-container ${initialAnimationComplete ? 'model-visible' : ''}`}
            >
                <MedicalPartModel scrollProgress={scrollProgress} />
            </div>

            {/* Contenido principal */}
            <div
                className="hero-content"
                style={{
                    opacity: 1 - (scrollProgress * 1.5),
                    transform: `translateY(${scrollProgress * -50}px)`,
                }}
            >
                <div className="hero-text">
                    <h1 className="hero-title">MEDIPARTS</h1>
                    <p className="hero-subtitle">
                        Piezas Médicas de Alta Calidad para Equipos Biomédicos
                    </p>
                    <p className="hero-description">
                        Soluciones especializadas para profesionales de la salud
                    </p>
                </div>
            </div>
        </section>
    );
}
