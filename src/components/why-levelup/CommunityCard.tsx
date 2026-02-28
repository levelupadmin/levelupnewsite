import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";
import testimonial8 from "@/assets/testimonial-8.jpg";
import community7 from "@/assets/community/community-7.jpg";
import community9 from "@/assets/community/community-9.jpg";
import community11 from "@/assets/community/community-11.jpg";
import { Hash, Users } from "lucide-react";

const threads: {
  avatar: string;
  name: string;
  time: string;
  text: string;
  reactions: string[];
  typing?: boolean;
  image?: string;
  replies?: { count: number; avatars: string[]; lastReply: string };
}[] = [
  {
    avatar: testimonial1,
    name: "Priya",
    time: "2m",
    text: "Anyone up for a 48hr edit challenge? 🎬",
    reactions: ["🔥 12", "💡 5", "🎬 3"],
    replies: { count: 4, avatars: [testimonial2, testimonial4, testimonial5], lastReply: "1m" },
  },
  {
    avatar: testimonial2,
    name: "Arjun",
    time: "3m",
    text: "I'm in — been wanting to try a one-take concept",
    reactions: ["✨ 6", "👀 4"],
    image: community7,
  },
  {
    avatar: testimonial4,
    name: "Meera",
    time: "5m",
    text: "Count me in! Can we do horror genre? 🎃",
    reactions: ["🤯 9", "😈 4", "🎭 2"],
  },
  {
    avatar: testimonial1,
    name: "Priya",
    time: "6m",
    text: "Horror it is. Let's sync at 8pm tonight 🕗",
    reactions: ["👏 11", "🫡 7"],
    typing: true,
  },
  {
    avatar: testimonial5,
    name: "Kiran",
    time: "1h",
    text: "Just watched Arjun's rough cut — the tension is insane 🔥",
    reactions: ["🔥 24", "💯 18", "👀 6"],
    image: community9,
    replies: { count: 7, avatars: [testimonial2, testimonial4], lastReply: "45m" },
  },
  {
    avatar: testimonial2,
    name: "Arjun",
    time: "1h",
    text: "Meera's sound design made all the difference honestly",
    reactions: ["💪 15", "🎧 3"],
  },
  {
    avatar: testimonial4,
    name: "Meera",
    time: "2h",
    text: "Learned that layering trick from Ravi Sir's masterclass 🎧",
    reactions: ["🙌 12", "✨ 8", "🎯 5"],
    replies: { count: 3, avatars: [testimonial1, testimonial8], lastReply: "1h" },
  },
  {
    avatar: testimonial1,
    name: "Priya",
    time: "2h",
    text: "All 3 films are done! Uploading for peer review now 🎉",
    reactions: ["🎬 32", "❤️ 27", "🤯 14"],
    typing: true,
    image: community11,
  },
  {
    avatar: testimonial5,
    name: "Kiran",
    time: "3h",
    text: "This community is something else 🙌",
    reactions: ["💛 41", "🫡 9"],
  },
  {
    avatar: testimonial2,
    name: "Arjun",
    time: "3h",
    text: "From strangers to collaborators in 48 hours ❤️",
    reactions: ["🔥 38", "❤️ 29", "💡 11"],
  },
];

const onlineAvatars = [testimonial5, testimonial6, testimonial7];

const MessageBubble = ({ msg, i }: { msg: typeof threads[0]; i: number }) => (
  <div className="flex gap-2 relative shrink-0">
    <div className="shrink-0 relative z-[1]">
      <div className="w-[22px] h-[22px] rounded-full overflow-hidden border border-primary/25 shadow-sm">
        <img src={msg.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
      {i % 3 === 0 && (
        <div className="absolute -bottom-0.5 -right-0.5 w-[6px] h-[6px] rounded-full bg-green-500 border border-[hsl(30,20%,10%)]" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline gap-1.5 mb-0.5">
        <span className="text-[8px] font-medium text-foreground/85">{msg.name}</span>
        <span className="text-[6px] text-foreground/30">{msg.time}</span>
      </div>
      <div
        className="rounded-lg px-2.5 py-1.5"
        style={{
          background: i % 4 === 0 ? "hsl(30 30% 18% / 0.8)" : "hsl(30 15% 15% / 0.6)",
          border: i % 4 === 0 ? "1px solid hsl(var(--primary) / 0.2)" : "1px solid hsl(var(--primary) / 0.08)",
        }}
      >
        <p className="text-[8px] text-foreground/65 leading-relaxed">{msg.text}</p>
        {msg.image && (
          <div className="mt-1 rounded overflow-hidden border border-primary/10">
            <img src={msg.image} alt="" className="w-full h-[40px] object-cover" loading="lazy" />
          </div>
        )}
      </div>
      <div className="flex gap-1.5 mt-1">
        {msg.reactions.map((r, ri) => (
          <span
            key={ri}
            className="text-[7px] px-1.5 py-[1px] rounded-full bg-primary/[0.08] border border-primary/10 text-foreground/50"
          >
            {r}
          </span>
        ))}
      </div>
      {msg.replies && (
        <div className="flex items-center gap-1.5 mt-1.5 ml-0.5 cursor-default">
          <div className="flex -space-x-1">
            {msg.replies.avatars.map((src, ai) => (
              <div
                key={ai}
                className="w-[12px] h-[12px] rounded-full overflow-hidden border border-primary/20"
                style={{ zIndex: msg.replies!.avatars.length - ai }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <span className="text-[7px] font-medium text-primary/70">{msg.replies.count} replies</span>
          <span className="text-[6px] text-foreground/25">{msg.replies.lastReply}</span>
        </div>
      )}
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="flex gap-2 items-center relative shrink-0 py-1">
    <div className="shrink-0 relative z-[1]">
      <div className="w-[22px] h-[22px] rounded-full overflow-hidden border border-primary/15 opacity-60">
        <img src={testimonial6} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
    </div>
    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-foreground/[0.03]">
      <div className="flex gap-[3px]">
        {[0, 1, 2].map((d) => (
          <div
            key={d}
            className="w-[3px] h-[3px] rounded-full bg-primary/40 animate-pulse"
            style={{ animationDelay: `${d * 0.3}s` }}
          />
        ))}
      </div>
      <span className="text-[7px] text-foreground/30 ml-1">typing…</span>
    </div>
  </div>
);

const CommunityCard = () => {
  const allMessages = threads.flatMap((msg, i) => {
    const items: React.ReactNode[] = [];
    items.push(<MessageBubble key={`msg-${i}`} msg={msg} i={i} />);
    if (msg.typing) {
      items.push(<TypingIndicator key={`typing-${i}`} />);
    }
    return items;
  });

  return (
    <div className="group/chat relative w-full h-full flex items-center justify-center p-3 overflow-hidden">
      <div
        className="relative w-[82%] h-[88%] rounded-xl border border-primary/20 overflow-hidden flex flex-col"
        style={{
          background: "hsl(30 20% 10% / 0.95)",
          boxShadow:
            "0 8px 32px -8px hsl(0 0% 0% / 0.4), 0 0 16px 2px hsl(30 80% 45% / 0.06)",
        }}
      >
        {/* Channel header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-primary/10">
          <div className="flex items-center gap-1.5">
            <Hash size={10} className="text-primary/60" />
            <span className="text-[9px] font-medium text-foreground/80">creators-lounge</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1.5">
              {onlineAvatars.map((src, i) => (
                <div
                  key={i}
                  className="w-[14px] h-[14px] rounded-full overflow-hidden border border-primary/20"
                >
                  <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <span className="text-[7px] text-foreground/40 ml-0.5">142 online</span>
          </div>
        </div>

        {/* Scrolling thread messages */}
        <div className="flex-1 overflow-hidden relative">
          {/* Gradient masks */}
          <div className="absolute inset-x-0 top-0 h-6 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, hsl(30 20% 10% / 0.95), transparent)" }} />
          <div className="absolute inset-x-0 bottom-0 h-6 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(30 20% 10% / 0.95), transparent)" }} />

          {/* Vertical thread line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-[1px] bg-primary/10 z-[1]" />

          {/* Scrolling container — duplicated for seamless loop */}
          <div className="animate-scroll-chat-up group-hover/chat:[animation-play-state:paused] px-3 py-2 flex flex-col gap-3">
            {allMessages}
            {allMessages}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-3 py-1.5 border-t border-primary/10 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Users size={8} className="text-primary/50" />
            <span className="text-[7px] text-foreground/40">2,400+ members</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[4px] h-[4px] rounded-full bg-green-500 animate-pulse" />
            <span className="text-[6px] text-foreground/30">Live now</span>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(30,80%,50%,0.04)_0%,_transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default CommunityCard;
