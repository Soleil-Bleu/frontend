import React, { useEffect, useRef, useState } from 'react';

const Tabs = ({ scenarios, scenarioIndex, setScenarioIndex, setHighlightedPuissance }) => {
    const tabsRef = useRef([]);
    const [activeTabIndex, setActiveTabIndex] = useState(scenarioIndex);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

    useEffect(() => {
        if (activeTabIndex === null) {
            return;
        }

        const setTabPosition = () => {
            const currentTab = tabsRef.current[activeTabIndex];
            setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
            setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
        };

        setTabPosition();
    }, [activeTabIndex]);

    const handleTabClick = (index, scenario) => {
        setActiveTabIndex(index);
        setScenarioIndex(index);
        setHighlightedPuissance(scenario.puissance);
    };

    return (
        <div className="flex-row sticky top-6 z-50 flex rounded-3xl border border-border bg-background/80 px-1 backdrop-blur-sm">
            <span
                className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-1 transition-all duration-300"
                style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
            >
                <span className="h-full w-full rounded-3xl bg-secondary/60" />
            </span>
            {scenarios.map((scenario, index) => {
                const isActive = activeTabIndex === index;

                return (
                    <button
                        key={index}
                        ref={(el) => (tabsRef.current[index] = el)}
                        className={`my-3 cursor-pointer select-none rounded-full px-4 text-center font-secondary font-light text-primary`}
                        onClick={() => handleTabClick(index, scenario)}
                    >
                        <span className={`${isActive ? `font-normal` : `hover:font-normal`} block`}>
                            {scenario.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
