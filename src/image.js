import React from "react"

export default function Image({ image }) {
  return (
    <aside>
      <img className="glitch" src={image} alt="personal-image" />
      <style jsx>{`
        .glitch {
          height: auto;
          width: 100%;
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
          6% {
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
