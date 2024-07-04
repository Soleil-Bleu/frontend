import { useEffect, useRef, useState } from "react";

let allTabs = [
  {
    id: "accueil",
    name: "Accueil",
  },
  {
    id: "valeurs",
    name: "Valeurs",
  },
  {
    id: "tarifs",
    name: "Tarifs",
  },
  {
    id: "association",
    name: "L'Association",
  },
];

export const Navbar = () => {
  const tabsRef = useRef([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
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

  const handleTabClick = (index, id) => {
    setActiveTabIndex(index);

    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex-row fixed left-[50%] translate-x-[-50%] top-4 z-10 flex rounded-3xl border border-border bg-background/80 px-1 backdrop-blur-sm">
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-1 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full rounded-3xl bg-secondary/60" />
      </span>
      {allTabs.map((tab, index) => {
        const isActive = activeTabIndex === index;

        return (
          <button
            key={index}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`${
              isActive ? `font-normal` : `hover:font-normal`
            } my-2 cursor-pointer select-none rounded-full px-4 text-center font-secondary font-light text-primary`}
            onClick={() => handleTabClick(index, tab.id)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};
