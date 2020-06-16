import React from "react"

export default function Image() {
  return (
    <aside>
      {/* <StyledImage src="/deer.jpeg" alt="my image" /> */}
      <div className="container">
        <img className="glitch" data-text="CYBERCOUNTESS" src="/deer.jpeg" />
      </div>
      <style jsx>{`
        aside {
          position: fixed;
          top: 0;
          bottom: 0;
          width: 50%;
          height: 100%;
          right: 0;
          padding: 2.5rem;
        }
        .container {
          border: 2px solid red;
        }
        .glitch {
          position: relative;
          animation: glitch 1s 1s infinite;
        }

        .glitch::before {
          content: attr(data-text);
          position: absolute;
          left: -2px;
          text-shadow: -5px 0 magenta;
          background: black;
          overflow: hidden;
          top: 0;
          animation: noise-1 1s linear infinite alternate-reverse,
            glitch 1s 1.05s infinite;
        }

        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          text-shadow: -5px 0 lightgreen;
          background: black;
          overflow: hidden;
          top: 0;
          animation: noise-2 1s linear infinite alternate-reverse,
            glitch 2s 2s infinite;
        }

        @keyframes glitch {
          1% {
            transform: rotateX(10deg) skewX(90deg);
          }
          2% {
            transform: rotateX(0deg) skewX(0deg);
          }
        }

        @keyframes noise-1 {
          $steps: 30;
          @for $i from 1 through $steps {
            #{percentage($i*(1/$steps))} {
              $top: random(100);
              $bottom: random(101 - $top);
              clip-path: inset(#{$top}px 0 #{$bottom}px 0);
            }
          }
        }

        @keyframes noise-2 {
          $steps: 30;
          @for $i from 0 through $steps {
            #{percentage($i*(1/$steps))} {
              $top: random(100);
              $bottom: random(101 - $top);
              clip-path: inset(#{$top}px 0 #{$bottom}px 0);
            }
          }
        }
      `}</style>
    </aside>
  )
}
