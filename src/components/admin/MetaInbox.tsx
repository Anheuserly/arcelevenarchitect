"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { MetaChannel, MetaChannelAccount, MetaInboxConversation } from "@/lib/metaInbox";

type MetaInboxProps = {
  accounts: MetaChannelAccount[];
  conversations: MetaInboxConversation[];
};

function formatTime(value: string | null) {
  if (!value) return "No activity";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No activity";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function channelLabel(channel: MetaChannel) {
  return channel === "whatsapp" ? "WhatsApp" : "Instagram";
}

export default function MetaInbox({ conversations }: MetaInboxProps) {
  const router = useRouter();
  const [channel, setChannel] = useState<MetaChannel | "all">("all");
  const [selectedId, setSelectedId] = useState(conversations[0]?.id || "");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [showStartChat, setShowStartChat] = useState(false);
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [templateName, setTemplateName] = useState("hello_world");
  const [startMode, setStartMode] = useState<"message" | "template">("message");
  const [initialMessage, setInitialMessage] = useState("Hello Shubham, this is a test message from the ARC 11 Architect WhatsApp assistant.");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const refreshInterval = window.setInterval(() => router.refresh(), 15000);
    return () => window.clearInterval(refreshInterval);
  }, [router]);

  const visibleConversations = useMemo(
    () => conversations.filter((conversation) => channel === "all" || conversation.channel === channel),
    [channel, conversations]
  );
  const selected = visibleConversations.find((conversation) => conversation.id === selectedId) || visibleConversations[0];

  function runAction(action: "takeover" | "resume" | "send_whatsapp", content?: string) {
    if (!selected) return;
    setNotice("");
    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/meta-inbox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, conversationId: selected.id, message: content }),
        });
        const result = await response.json() as { message?: string };
        if (!response.ok) throw new Error(result.message || "The inbox action could not be completed.");
        setMessage("");
        setNotice(action === "send_whatsapp" ? "Message sent. Refreshing the inbox will show its delivery status." : "Conversation state updated.");
      } catch (error) {
        setNotice(error instanceof Error ? error.message : "The inbox action could not be completed.");
      }
    });
  }

  function startWhatsAppChat() {
    setNotice("");
    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/meta-inbox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "start_whatsapp", name: contactName, phoneNumber, templateName, initialMessage: startMode === "message" ? initialMessage : "", templateLanguage: "en_US" }),
        });
        const result = await response.json() as { message?: string };
        if (!response.ok) throw new Error(result.message || "The WhatsApp chat could not be started.");
        setShowStartChat(false);
        setPhoneNumber("");
        setNotice(startMode === "message" ? "WhatsApp message accepted by Meta. The new thread is now in the inbox." : "WhatsApp template accepted by Meta. The new thread is now in the inbox.");
        router.refresh();
      } catch (error) {
        setNotice(error instanceof Error ? error.message : "The WhatsApp chat could not be started.");
      }
    });
  }

  return (
    <>
      <section className="card flex min-h-[680px] flex-col overflow-hidden lg:h-full lg:min-h-0">
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] px-5 py-4 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="kicker">Communication workspace</p>
              <h3 className="mt-1 text-2xl">Meta Inbox</h3>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Meta communication channels">
              {(["all", "whatsapp", "instagram"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => { setChannel(item); setSelectedId(""); }}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition ${channel === item ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]" : "border-[var(--line)] bg-white text-[var(--muted)] hover:border-[var(--foreground)]"}`}
                >
                  {item === "all" ? "All channels" : channelLabel(item)}
                </button>
              ))}
              <button
                type="button"
                onClick={() => router.refresh()}
                className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)] transition hover:border-[var(--foreground)]"
              >
                Refresh inbox
              </button>
              <button type="button" onClick={() => setShowStartChat(true)} className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs uppercase tracking-[0.16em] text-white">
                New chat
              </button>
            </div>
          </div>
          {notice ? <p className="w-full text-sm text-[var(--muted)]" role="status">{notice}</p> : null}
        </div>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.8fr)]">
          <aside className="min-h-0 overflow-y-auto border-b border-[var(--line)] bg-[#f8f7f3] lg:border-b-0 lg:border-r">
            {visibleConversations.length ? visibleConversations.map((conversation) => (
              <button
                type="button"
                key={conversation.id}
                onClick={() => setSelectedId(conversation.id)}
                className={`block w-full border-b border-[var(--line)] px-5 py-4 text-left transition ${selected?.id === conversation.id ? "bg-white" : "hover:bg-white/70"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[var(--foreground)]">{conversation.contactName}</p>
                    <p className="mt-1 truncate text-xs uppercase tracking-[0.14em] text-[var(--muted-2)]">{channelLabel(conversation.channel)}</p>
                  </div>
                  {conversation.unreadCount ? <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-white">{conversation.unreadCount}</span> : null}
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-[var(--muted)]">{conversation.lastMessage}</p>
                <p className="mt-2 text-xs text-[var(--muted-2)]">{formatTime(conversation.lastMessageAt)}</p>
              </button>
            )) : (
              <div className="p-6 text-sm leading-6 text-[var(--muted)]">No stored conversations for this channel yet. Verified webhooks will create contacts and threads here automatically.</div>
            )}
          </aside>

          {selected ? (
            <div className="flex min-h-0 min-w-0 flex-col">
              <div className="flex shrink-0 flex-wrap items-start justify-between gap-4 border-b border-[var(--line)] px-5 py-4 md:px-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">{channelLabel(selected.channel)} conversation</p>
                  <h4 className="mt-2 text-2xl">{selected.contactName}</h4>
                  <p className="mt-1 text-sm text-[var(--muted)]">{selected.contactPhone || selected.contactHandle || "Contact profile pending"}</p>
                </div>
                <button
                  type="button"
                  onClick={() => runAction(selected.isHumanActive ? "resume" : "takeover")}
                  disabled={isPending}
                  className="rounded-full border border-[var(--foreground)] px-4 py-2 text-xs uppercase tracking-[0.15em] disabled:opacity-50"
                >
                  {selected.isHumanActive ? "Release to automation" : "Take over"}
                </button>
              </div>
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#fcfbf8] px-5 py-6 md:px-6">
                {selected.messages.map((item) => (
                  <div key={item.id} className={`max-w-[85%] rounded-[8px] border p-4 ${item.direction === "outbound" ? "ml-auto border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]" : "border-[var(--line)] bg-white text-[var(--foreground)]"}`}>
                    <p className="whitespace-pre-wrap text-sm leading-6">{item.body}</p>
                    <p className={`mt-2 text-[11px] uppercase tracking-[0.14em] ${item.direction === "outbound" ? "text-white/65" : "text-[var(--muted-2)]"}`}>
                      {formatTime(item.createdAt)}{item.direction === "outbound" ? ` · ${item.deliveryStatus}` : ""}
                    </p>
                  </div>
                ))}
              </div>
              <div className="shrink-0 border-t border-[var(--line)] bg-white p-5 md:p-6">
                {selected.channel === "whatsapp" ? (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Write a WhatsApp reply..."
                      className="min-h-24 flex-1 rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
                      maxLength={4096}
                    />
                    <button type="button" onClick={() => runAction("send_whatsapp", message)} disabled={isPending || !message.trim()} className="self-end rounded-full bg-[var(--accent)] px-5 py-3 text-xs uppercase tracking-[0.16em] text-white disabled:opacity-50">
                      Send reply
                    </button>
                  </div>
                ) : (
                  <p className="text-sm leading-6 text-[var(--muted)]">Instagram messages are stored here when its webhook is connected. Outbound Instagram Direct is held until the account permissions are configured.</p>
                )}
                {notice ? <p className="mt-3 text-sm text-[var(--muted)]" role="status">{notice}</p> : null}
              </div>
            </div>
          ) : (
            <div className="flex min-h-0 items-center justify-center px-8 text-center text-sm leading-6 text-[var(--muted)]">Select a conversation once the channel starts receiving messages.</div>
          )}
        </div>
      </section>
      {showStartChat ? <div className="fixed inset-0 z-[100] grid place-items-center bg-black/45 p-4" role="dialog" aria-modal="true" aria-label="Start a WhatsApp chat">
        <div className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-[8px] border border-[var(--line)] bg-[var(--background)] p-6 shadow-2xl md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div><p className="kicker">Outbound contact</p><h3 className="mt-2 text-3xl">Start a WhatsApp chat</h3></div>
            <button type="button" onClick={() => setShowStartChat(false)} className="rounded-full border border-[var(--line)] px-4 py-2 text-xs uppercase tracking-[0.14em]">Close</button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">Contact name<input value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder="Contact name" className="rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--foreground)]" /></label>
            <label className="grid gap-2 text-sm">WhatsApp number<input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} placeholder="+91 81714 86963" inputMode="tel" className="rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--foreground)]" /></label>
            <div className="grid gap-2 text-sm md:col-span-2"><span>Delivery mode</span><div className="flex rounded-[8px] border border-[var(--line)] bg-white p-1 text-xs"><button type="button" onClick={() => setStartMode("message")} className={`flex-1 rounded-[5px] px-3 py-2 ${startMode === "message" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--muted)]"}`}>Active reply window</button><button type="button" onClick={() => setStartMode("template")} className={`flex-1 rounded-[5px] px-3 py-2 ${startMode === "template" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--muted)]"}`}>Approved template</button></div></div>
            {startMode === "message" ? <label className="grid gap-2 text-sm md:col-span-2">Message<textarea value={initialMessage} onChange={(event) => setInitialMessage(event.target.value)} maxLength={4096} className="min-h-28 rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--foreground)]" /></label> : <label className="grid gap-2 text-sm md:col-span-2">Approved Meta template<input value={templateName} onChange={(event) => setTemplateName(event.target.value)} placeholder="arc11_consultation_followup" className="rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 outline-none focus:border-[var(--foreground)]" /></label>}
            <p className="text-xs leading-5 text-[var(--muted)] md:col-span-2">A normal message is available only during Meta's 24-hour reply window. Use an approved template to begin a new conversation.</p>
            <button type="button" onClick={startWhatsAppChat} disabled={isPending || !phoneNumber.trim() || (startMode === "message" ? !initialMessage.trim() : !templateName.trim())} className="justify-self-end rounded-full bg-[var(--accent)] px-5 py-3 text-xs uppercase tracking-[0.16em] text-white disabled:opacity-50 md:col-span-2">{startMode === "message" ? "Send message" : "Send template"}</button>
          </div>
        </div>
      </div> : null}
    </>
  );
}
