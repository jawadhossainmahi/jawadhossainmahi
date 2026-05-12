import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const cursorRef   = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor   = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    gsap.set(cursor,   { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const xToCursor   = gsap.quickTo(cursor,   "x", { duration: 0.1, ease: "power3" });
    const yToCursor   = gsap.quickTo(cursor,   "y", { duration: 0.1, ease: "power3" });
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.3, ease: "power3" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.3, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const expand = () => {
      gsap.to(cursor,   { scale: 2,   backgroundColor: "rgba(0,212,255,0.1)", duration: 0.3 });
      gsap.to(follower, { scale: 1.5, borderColor: "rgba(0,212,255,0.5)",     duration: 0.3 });
    };
    const shrink = () => {
      gsap.to(cursor,   { scale: 1,   backgroundColor: "rgba(0,212,255,1)",   duration: 0.3 });
      gsap.to(follower, { scale: 1,   borderColor: "rgba(0,212,255,0.3)",     duration: 0.3 });
    };

    /* Attach hover listeners via event delegation — no DOM-readiness issue */
    const onDocEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, .hoverable")) expand();
    };
    const onDocLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, .hoverable")) shrink();
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover",  onDocEnter);
    document.addEventListener("mouseout",   onDocLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover",  onDocEnter);
      document.removeEventListener("mouseout",   onDocLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-screen"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/30 rounded-full pointer-events-none z-[9998]"
      />
    </>
  );
}
