"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

type MenuOption = "chat" | null;

export default function TawkMessenger() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<MenuOption>(null);
  const [position, setPosition] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `(function(global){
      global.$_Tawk_AccountKey='5b899dd9afc2c34e96e81b9f';
      global.$_Tawk_WidgetId='default';
      global.$_Tawk_Unstable=false;
      global.$_Tawk = global.$_Tawk || {};
      (function (w){
      function l() {
        if (window.$_Tawk.init !== undefined) {
          return;
        }

        window.$_Tawk.init = true;

        var files = [
          'https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-main.js',
          'https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-vendor.js',
          'https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-chunk-vendors.js',
          'https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-chunk-common.js',
          'https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-runtime.js',
          'https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-app.js'
        ];

        if (typeof Promise === 'undefined') {
          files.unshift('https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-promise-polyfill.js');
        }

        if (typeof Symbol === 'undefined' || typeof Symbol.iterator === 'undefined') {
          files.unshift('https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-iterator-polyfill.js');
        }

        if (typeof Object.entries === 'undefined') {
          files.unshift('https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-entries-polyfill.js');
        }

        if (!window.crypto) {
          window.crypto = window.msCrypto;
        }

        if (typeof Event !== 'function') {
          files.unshift('https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-event-polyfill.js');
        }

        if (!Object.values) {
          files.unshift('https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-object-values-polyfill.js');
        }

        if (typeof Array.prototype.find === 'undefined') {
          files.unshift('https://embed.tawk.to/_s/v4/app/69293594c36/js/twk-arr-find-polyfill.js');
        }

        var s0=document.getElementsByTagName('script')[0];

        for (var i = 0; i < files.length; i++) {
          var s1 = document.createElement('script');
          s1.src= files[i];
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
        }
      }
      if (document.readyState === 'complete') {
        l();
      } else if (w.attachEvent) {
        w.attachEvent('onload', l);
      } else {
        w.addEventListener('load', l, false);
      }
    })(window);

    })(window);`;
    document.head.appendChild(script);

    // Configurar eventos cuando Tawk se cargue
    const setupTawkEvents = () => {
      if (window.Tawk_API) {
        window.Tawk_API.onLoad = () => {
          if (typeof window.Tawk_API.hideWidget === 'function') {
            window.Tawk_API.hideWidget();
          }
        };

        window.Tawk_API.onChatStarted = () => {
          // Chat started
        };

        window.Tawk_API.onChatMinimized = () => {
          if (typeof window.Tawk_API.hideWidget === 'function') {
            window.Tawk_API.hideWidget();
          }
          setSelectedOption(null);
        };

        window.Tawk_API.onChatHidden = () => {
          setSelectedOption(null);
        };
      }
    };

    // Esperar a que Tawk se cargue
    const checkTawk = setInterval(() => {
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        setupTawkEvents();
        window.Tawk_API.hideWidget();
        clearInterval(checkTawk);
      }
    }, 500);

    return () => {
      clearInterval(checkTawk);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedOption === "chat" && window.Tawk_API && typeof window.Tawk_API.showWidget === 'function') {
      setTimeout(() => {
        window.Tawk_API.showWidget();
        // Apply positioning to all Tawk elements
        setTimeout(() => {
          const applyPosition = () => {
            // Try multiple selectors to find Tawk widget
            const selectors = [
              'iframe[title="chat widget"]',
              '#tawk-bubble-container',
              '[id*="tawk"]',
              'div[style*="position: fixed"]'
            ];
            
            selectors.forEach(selector => {
              const elements = document.querySelectorAll(selector);
              elements.forEach(el => {
                if (el && el.style) {
                  el.style.setProperty('bottom', '150px', 'important');
                  el.style.setProperty('right', '24px', 'important');
                }
              });
            });
          };
          
          applyPosition();
          // Reapply after another delay to ensure it sticks
          setTimeout(applyPosition, 500);
        }, 100);
      }, 200);
    }
  }, [selectedOption]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSelectedOption(null);
      // Ocultar el widget de Tawk
      if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
        window.Tawk_API.hideWidget();
      }
    }
  };

  const handleOptionSelect = (option: MenuOption, e?: React.MouseEvent) => {
    if (option === "chat") {
      setSelectedOption(option);
      setIsOpen(false);
    } else {
      // Ocultar el widget si estaba abierto
      if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
        window.Tawk_API.hideWidget();
      }
      setSelectedOption(option);
      setIsOpen(false);
    }
  };

  const closePanel = () => {
    setSelectedOption(null);
    // Ocultar el widget de Tawk
    if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
      window.Tawk_API.hideWidget();
    }
  };

  // Calcular posiciones horizontales para los botones (arriba, de derecha a izquierda)
  const getHorizontalPosition = (index: number, total: number) => {
    const spacing = 70; // Espacio entre botones
    const yPosition = -80; // Posición arriba del botón principal

    return {
      x: -(index * spacing), // Negativo para ir de derecha a izquierda
      y: yPosition,
    };
  };

  const menuItems = [
    {
      id: "chat",
      label: "Chat",
      icon: MessageCircle,
      color: "bg-blue-950 hover:bg-blue-900",
    },
  ];

  return (
    <>


      {/* Botón flotante principal */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen &&
            menuItems.map((item, index) => {
              const position = getHorizontalPosition(index, menuItems.length);
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: 1,
                    x: position.x,
                    y: position.y,
                  }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.1,
                  }}
                  onClick={(e) => handleOptionSelect(item.id as MenuOption, e)}
                  className={`absolute bottom-0 right-0 ${item.color} text-white p-4 rounded-full shadow-lg transition-colors duration-200 flex items-center justify-center group`}
                  title={item.label}
                >
                  <Icon size={24} />
                  <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
        </AnimatePresence>

        {/* Botón principal */}
        <motion.button
          onClick={toggleMenu}
          className="relative bg-red-700 hover:bg-red-800 text-white p-5 rounded-full shadow-2xl transition-colors duration-200 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
          </motion.div>
        </motion.button>
      </div>
    </>
  );
}
