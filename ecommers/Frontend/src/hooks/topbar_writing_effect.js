import { useState, useEffect } from 'react';

const useTopbarWritingEffect = (phrases = ["equipos médicos...", "monitores...", "sensores...", "refacciones..."]) => {
    const [placeholderText, setPlaceholderText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [isSearchHovered, setIsSearchHovered] = useState(false);

    useEffect(() => {
        if (!isSearchHovered) {
            setPlaceholderText('');
            return;
        }

        const i = loopNum % phrases.length;
        const fullText = phrases[i];

        const handleTyping = () => {
            setPlaceholderText(isDeleting
                ? fullText.substring(0, placeholderText.length - 1)
                : fullText.substring(0, placeholderText.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && placeholderText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && placeholderText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [placeholderText, isDeleting, loopNum, typingSpeed, isSearchHovered, phrases]);

    return {
        placeholderText,
        isSearchHovered,
        setIsSearchHovered
    };
};

export default useTopbarWritingEffect;
