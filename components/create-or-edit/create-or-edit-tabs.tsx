import React, { useEffect, useRef } from "react";

interface Tab {
  key: string;
  label: string;
  id: string;
}

export default function CreateOrEditTabs({ tabs }: { tabs: Tab[] }) {
  const TAB_BAR_HEIGHT = 140;
  const [activeTab, setActiveTab] = React.useState(tabs[0]?.key);
  const isProgrammaticScrollRef = useRef(false);

  const handleTabClick = (id: string, key: string) => {
    setActiveTab(key);
    isProgrammaticScrollRef.current = true;
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      window.scrollTo({
        top: rect.top + scrollTop - TAB_BAR_HEIGHT,
        behavior: "smooth",
      });
    }
    setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;
      if (Math.abs(scrollPosition - pageHeight) < 2) {
        setActiveTab(tabs[tabs.length - 1]?.key);
        return;
      }
      let found = false;
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        const section = document.getElementById(tab.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionMiddle = rect.top + rect.height / 2;
          if (
            sectionMiddle >= TAB_BAR_HEIGHT &&
            sectionMiddle < window.innerHeight
          ) {
            setActiveTab(tab.key);
            found = true;
            break;
          }
        }
      }
      if (!found) {
        setActiveTab(tabs[0]?.key);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);
  return (
    <div className="fixed top-[64px] left-0 right-0 z-40 bg-gradient-to-b from-gray-50/95 to-gray/95 backdrop-blur-sm">
      <div className="max-w-screen-xl 2xl:mx-[232px] xl:mx-[150px] lg:mx-[110px] md:mx-[90px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 sm:space-x-8 h-[64px] overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.key}
              onClick={() => handleTabClick(tab.id, tab.key)}
              className={`
                relative px-1 py-4 text-sm sm:text-base font-medium
                transition-all duration-300 group
                ${
                  activeTab === tab.key
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-900"
                }
              `}
            >
              <span className="relative z-10">{tab.label}</span>
              <span
                className={`
                  absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600
                  transition-all duration-300 ease-out
                  ${activeTab === tab.key ? "w-full" : "w-0 group-hover:w-full"}
                `}
              />
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-indigo-500/10 to-transparent blur-xl" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
