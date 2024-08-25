'use client'

import { useEffect, useState } from "react";

const Randomizer = () => {
    const [framework, setFramework] = useState<string | null>(null);

    const saveFramework = () => {
        if (framework) {
            localStorage.setItem("savedFramework", JSON.stringify(framework));
        }
    };

    useEffect(() => {
        const savedFramework = localStorage.getItem('savedFramework');
        if (savedFramework) {
            try {
                setFramework(JSON.parse(savedFramework));
            } catch (error) {
                console.error('Failed to parse saved framework:', error);
            }
        }
    }, []);

    return (
        <div className="randomizer">
            <h2>Click to receive a random CSS framework</h2>
            <RandomizerBtn updateFramework={setFramework} />
            {framework && (
                <>
                    <h3>Your framework is...</h3>
                    <h2 className={`randomizer__framework randomizer__framework--${framework.toLowerCase()}`}>{framework}</h2>
                    <div className="randomizer__framework--saver">
                        <h2>Are you happy with the framework? Then save it!</h2>
                        <button onClick={saveFramework} className="randomizer__framework--save-button">Save</button>
                    </div>
                </>
            )}
        </div>
    );
};

type RandomizerBtnProps = {
    updateFramework: (framework: string) => void;
};

const RandomizerBtn = ({ updateFramework }: RandomizerBtnProps) => {
    const frameworks = ['Bootstrap', 'SASS', 'Tailwind', 'MUI', 'Styled-components'];

    const handleClick = () => {
        const randomIndex = Math.floor(Math.random() * frameworks.length);
        const randomFramework = frameworks[randomIndex];
        updateFramework(randomFramework);
        localStorage.removeItem('savedFramework');
    };

    return (
        <button onClick={handleClick} className="randomizer-btn">
            Randomize!
        </button>
    );
};

export default Randomizer;
