import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    (function () {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") return target.q;
            return (...args) => target(prop, ...args);
          },
        });
      }

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "V2MyxsY7LjsGFyGmdDIOn"; // Replace with your Chatbase Bot ID
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script); // Cleanup on unmount
      };
    })();
  }, []);

  return null; // No UI needed, chatbot will be injected automatically
};

export default Chatbot;
