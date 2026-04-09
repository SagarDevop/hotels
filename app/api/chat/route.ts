import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = "AIzaSyDNB-JxzopSysC73yOWpSql9PupeQ1J0lY"
 
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const PHONE_NUMBER = "919359923689";

const SYSTEM_PROMPT = `
Role: You are Niyati — a warm, caring female booking assistant AND comprehensive Mathura-Vrindavan travel guide for "Naari Homestay," a premium family sanctuary in Dampier Nagar, Mathura, located right opposite the Police Chowki.

CRITICAL RULES:
1. You are a TRAVEL GUIDE first, booking assistant second. Answer ALL questions — Janmabhoomi darshan, Vrindavan visiting hours, food, directions, tips.
2. NEVER force booking flow. Only discuss booking when user explicitly asks to book or wants room info.
3. If someone asks about places, temples, food, mathura history — give detailed, helpful answers.
4. Keep responses 3-8 lines. Be helpful, not salesy.

Your Identity:
- Name: Niyati. You are a girl/woman.
- ALWAYS use feminine Hindi: "main karti hoon", "rahi hoon", "sakti hoon", "bata rahi hoon"
- NEVER masculine: "karta hoon", "raha hoon", "sakta hoon"

Communication Style:
- Warm, respectful Hinglish. Use "ji" for respect.
- Match the guest's language — Hindi reply to Hindi, English to English.
- Use max 2 emojis per message.

Hotel Information (use only when asked):
- Name: Naari Homestay, Mathura
- Location: Dampier Nagar, Opp. Police Chowki (Very safe for families).
- Rooms: 
  1. King Deluxe Room — ₹2,500/night (Spacious, for couples/solo)
  2. Couple Deluxe Room — ₹2,000/night (Cozy, for spiritual seekers)
  3. Family Vacation Suite — ₹4,500/night (Massive space, private kitchen, for 6+ guests)
- Key Pillars: Safety (Opp. Police Chowki), Home-Stays-Home hospitality, Private Kitchens available.
- Check-in: 12 PM, Check-out: 11 AM
- Rules: Valid ID required. No smoking. Pay at hotel.

MATHURA & VRINDAVAN TRAVEL GUIDE (your MAIN knowledge):

🛕 Major Temples & Sacred Sites:
- Shri Krishna Janmabhoomi: Most important. 1.2 km from hotel. Walking or 5 min auto. Visit early morning (5-8 AM) or evening for aarti.
- Dwarkadhish Temple: Near Vishram Ghat. 1.5 km away. Famous for Swing Festival (Hariyali Teej).
- Vishram Ghat: Where Lord Krishna rested. Yamuna Aarti is beautiful (Evening ~6:30 PM). Boat rides available.
- Banke Bihari (Vrindavan): 10 km from hotel. 25-30 min drive. Extremely crowded — reach early.
- Prem Mandir (Vrindavan): Stunning illumination in evening. 10 km. Best visited after 6 PM for light show.
- ISKCON Temple: 11 km. Very peaceful.

📅 Suggested Itinerary (1-Day):
- Morning: Janmabhoomi Darshan → Dwarkadhish → Vishram Ghat (Yamuna Ghat).
- Afternoon: Rest at Naari Homestay.
- Evening: Drive to Vrindavan → Prem Mandir → Banke Bihari → Back to hotel.

🚗 Transport:
- Auto-rickshaws available right outside hotel (Police Chowki area).
- E-rickshaws for short distances (Janmabhoomi/Dwarkadhish): ₹10-20.
- Full day taxi for Vrindavan trip: ₹1200-1500.

🍽️ Food:
- Mathura's Brijwasi sweets & Pedas are world-famous. Try them near the market.
- Street food: Bedmi Poori & Kachori in morning.

💡 Practical Tips:
- Carry local identity.
- Wear modest clothes for temples.
- Be careful of monkeys in Vrindavan (keep glasses/phones safe!).

RESPONSE GUIDELINES:
1. If someone says "hi/hello/namaste" → Welcome warmly to Naari Homestay, ask what they'd like to know — rooms OR Mathura travel info.
2. If someone asks about PLACES/TEMPLES/TRAVEL → Give detailed travel info. Do NOT push booking.
3. If someone asks about ROOMS/PRICE/BOOKING → Give room info, then gently guide to booking.
4. Only at END of travel info, add: "Humara homestay Janmabhoomi se sirf 1.2 km hai — agar stay chahiye toh bata dijiye! 😊"
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    if (!GEMINI_API_KEY) {
      throw new Error("API configuration missing");
    }

    const lastUserMessage = messages[messages.length - 1].content;
    const lastMsgLower = lastUserMessage.toLowerCase();

    // ===== SMART INTENT DETECTION =====
    // Only check the LAST message for intent — not entire history
    const isExplicitBooking = ["book karo", "booking karo", "reserve karo", "room book", "booking karni", "room chahiye", "book a room", "i want to book", "booking please"].some(k => lastMsgLower.includes(k));
    const isExplicitPrice = ["price", "cost", "kitna paisa", "kitne ka", "rate kya", "charges", "kitna lagega", "room rate", "price kya"].some(k => lastMsgLower.includes(k));

    // Check if user is CONTINUING an active booking flow (bot asked a booking question in last message)
    const lastBotMessage = messages.length >= 2 ? messages[messages.length - 2] : null;
    const isInBookingFlow = lastBotMessage?.role === "assistant" && (
      lastBotMessage.content.toLowerCase().includes("aapka shubh naam") ||
      lastBotMessage.content.toLowerCase().includes("kab aa rahe") ||
      lastBotMessage.content.toLowerCase().includes("kitne log") ||
      lastBotMessage.content.toLowerCase().includes("kaunsa pasand") ||
      lastBotMessage.content.toLowerCase().includes("kaunsa accha")
    );

    // If user is mid-booking but asks a different question, let Gemini handle it
    const isChangingTopic = isInBookingFlow && (
      ["temple", "mandir", "ghat", "parikrama", "ghoomna", "kahan", "places", "yatra", "travel", "plan", "weather", "kaise", "auto", "train", "bus", "food", "khana", "peda"].some(k => lastMsgLower.includes(k))
    );

    // ===== BOOKING STATE ENGINE =====
    const userData = { name: "", dates: "", guests: "", roomType: "", isFamily: false };

    if (isInBookingFlow || isExplicitBooking) {
      messages.forEach((msg: any, index: number) => {
        const content = msg.content;
        const prevBotMsg = index > 0 ? messages[index - 1].content.toLowerCase() : "";
        
        if (msg.role === "user") {
          if (prevBotMsg.includes("aapka shubh naam") || prevBotMsg.includes("your name")) userData.name = content;
          if (prevBotMsg.includes("kab aa rahe") || prevBotMsg.includes("travel dates") || prevBotMsg.includes("availability check")) userData.dates = content;
          if (prevBotMsg.includes("kitne log") || prevBotMsg.includes("how many")) {
            const guestMatch = content.match(/\d+/);
            userData.guests = content;
            if (guestMatch && parseInt(guestMatch[0]) > 2) userData.isFamily = true;
          }
          if (prevBotMsg.includes("kaunsa pasand") || prevBotMsg.includes("kaunsa accha")) {
            const low = content.toLowerCase();
            if (low.includes("deluxe")) userData.roomType = "Deluxe Room";
            if (low.includes("family") || low.includes("sasta") || low.includes("budget") || low.includes("1600") || low.includes("1,600")) userData.roomType = "Family Room";
          }
        }
      });
    }

    // ===== RESPONSE LOGIC =====
    let manualResponse = "";

    // 1. If user changed topic mid-booking → let Gemini answer
    if (isChangingTopic) {
      // Fall through to Gemini — don't intercept
    }
    // 2. Pure price question (not in booking flow)
    else if (isExplicitPrice && !isInBookingFlow) {
      manualResponse = "🙏 Ji, hamare room rates:\n\n🛏️ King Deluxe — ₹2,500/night (Spacious)\n🛏️ Couple Deluxe — ₹2,000/night (Cozy)\n👨‍👩‍👧‍👦 Family Vacation Suite — ₹4,500/night (Kitchen included)\n\nDono rooms mein AC, WiFi, TV, Hot Water aur Safe Parking (Opp. Police Chowki) included hai.\n\nBooking karna chahein toh bata dijiye — main madad kar deti hoon! 😊";
    }
    // 3. Explicit booking request — start sequential flow
    else if (isExplicitBooking && !userData.name) {
      manualResponse = "Bahut accha! Main booking mein madad karti hoon. 🙏\nSabse pehle — aapka shubh naam kya hai?";
    }
    // 4. Continuing booking flow (bot asked something, user is replying)
    else if (isInBookingFlow && !isChangingTopic) {
      if (!userData.name) {
        manualResponse = "Aapka shubh naam bata dijiye, taaki main booking shuru kar sakoon 🙏";
      } else if (!userData.dates) {
        manualResponse = `${userData.name} ji, swagat hai! 😊\nAap Mathura kab aa rahe hain? Dates bata dijiye, main availability check kar leti hoon.`;
      } else if (!userData.guests) {
        manualResponse = "Bahut accha! Kitne log aa rahe hain? Isse main sahi room suggest kar sakti hoon. 🙏";
      } else if (!userData.roomType) {
        if (userData.isFamily) {
          manualResponse = "Family के लिए हमारा Family Vacation Suite (₹4,500/night) perfect hai — massive space & private kitchen! 👨‍👩‍👧‍👦\nYa King Deluxe (₹2,500/night) bhi hai.\n\nKaunsa pasand aayega?";
        } else {
          manualResponse = "Hamare options hain:\n\n🛏️ King Deluxe — ₹2,500/night\n🛏️ Couple Deluxe — ₹2,000/night\n👨‍👩‍👧‍👦 Family Suite — ₹4,500/night\n\nKaunsa accha lagega?";
        }
      } else {
        // BOOKING COMPLETE
        const waMsg = `🙏 *Booking Inquiry — Naari Homestay, Mathura*\n\n👤 Name: ${userData.name}\n📅 Dates: ${userData.dates}\n👥 Guests: ${userData.guests}\n🛏️ Room: ${userData.roomType}\n\n✅ Guest is ready to book.`;
        const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(waMsg)}`;

        return NextResponse.json({ 
          text: `Bahut badhiya, ${userData.name} ji! 🙏\n\nAapki booking details:\n🛏️ Room: ${userData.roomType}\n📅 Dates: ${userData.dates}\n👥 Guests: ${userData.guests}\n\n💰 Pay at hotel — koi advance nahi!\nNeeche WhatsApp ya Call button se booking confirm karein.`,
          intent: { isBooking: true }, 
          userData, 
          bookingReady: true,
          whatsappUrl
        });
      }
    }

    // If we have a manual response, send it
    if (manualResponse) {
      return NextResponse.json({ text: manualResponse, intent: {}, userData, bookingReady: false });
    }

    // ===== GEMINI AI — handles EVERYTHING else =====
    // Travel questions, temple info, general chat, food questions, transport, tips, etc.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      systemInstruction: SYSTEM_PROMPT 
    });
    
    const rawHistory = messages.slice(0, -1).map((msg: any) => ({ 
      role: msg.role === "user" ? "user" : "model", 
      parts: [{ text: msg.content }] 
    }));
    
    // Clean history — ensure it starts with user message
    const cleanHistory = [];
    let hasStarted = false;
    for (const msg of rawHistory) { 
      if (msg.role === "user") hasStarted = true; 
      if (hasStarted) cleanHistory.push(msg); 
    }
    
    const chat = model.startChat({ history: cleanHistory });
    const result = await chat.sendMessage(lastUserMessage);
    const response = await result.response;
    
    return NextResponse.json({ 
      text: response.text(), 
      intent: {}, 
      userData, 
      bookingReady: false 
    });

  } catch (error: any) {
    console.error("Chat API Error:", error?.message || error);
    return NextResponse.json({ 
      text: "Kshama karein, abhi network issue aa rahi hai. Kripya thodi der mein try karein ya call karein: +91 95842 36145 🙏" 
    }, { status: 500 });
  }
}
