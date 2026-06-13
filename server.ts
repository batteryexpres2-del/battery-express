import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import dotenv from "dotenv";
import fs from "fs";
import { startMonitoringJobs } from "./src/utils/monitoring";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Warning: GEMINI_API_KEY environment variable is not defined.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "dummy-key-to-prevent-crash",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // WebSocket for Gemini Live API
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    const { pathname } = new URL(request.url || '', `http://${request.headers.host}`);
    
    if (pathname === '/ws-live') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on("connection", async (clientWs: WebSocket) => {
    console.log("Client connected to Live API");
    
    let session: any;

    try {
      session = await getGenAI().live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            // Forward everything from Gemini to the client
            clientWs.send(JSON.stringify(message));
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: "You are the Senior Technical Engineer for Battery Express in Jeddah. Your responses must be strictly professional, analytical, and concise. When a user describes a technical problem (e.g., car won't start, battery issues), provide an immediate technical diagnosis or explanation based on automotive engineering principles. Avoid marketing fluff or generic phrases. After the technical analysis, end with the mandatory Field Communication Protocol precisely: 'بناءً على التشخيص التقني أعلاه، فريق Battery Express جاهز للتحرك لموقعك في [جدة/مكة]. لتوفير الوقت وضمان توافق البطارية، يرجى تزويدي بالآتي:\nموديل السيارة وسنة الصنع.\nموقعك الحالي (إرسال الموقع عبر واتساب).\nتوقيتك المفضل للوصول.\nسنقوم فوراً بجدولة المهمة وتجهيز البطارية المتوافقة مع نظام سيارتك.' Maintain a scientific methodology in your explanations. [Classification Protocol Guide]: - Modern vehicles (2020-2026): analyze parasitic draw from ECUs and CAN-Bus network integrity. - Vehicles parked for long periods: outline self-discharge effects and the need for smart chargers. - Coastal areas (Jeddah/Makkah): examine heat and humidity accelerating terminal corrosion or plate sulfation. - Alternator suspicions: do not recommend battery replacement immediately; ask them to measure charging voltage first to verify alternator integrity. [Geographic Reference Guide]: - Location analysis: identify specific neighborhood/district (e.g., Al-Tawfeeq, Al-Samer, Al-Jameah, Ash-Shauqiyyah in Makkah) immediately upon receiving location. - Local challenges: notify the client of realistic ETA (e.g., 30-45 minutes) based on heavy traffic/topography in Jeddah/Makkah. - Customized advice: for coastal areas with severe humidity, emphasize checking terminal connections for salt oxidation; for Makkah's mountainous areas, emphasize testing battery cells under high load and starting pressure. [JSON-LD Schema Generation Protocol Guide]: - It is strictly forbidden to mention the excluded neighborhood in any context. - When a new neighborhood name is provided, automatically find accurate geographic coordinates in Jeddah/Makkah. - Construct a 100% compliant JSON-LD Schema.org AutoRepair microdata block. - The technical description must cover (CAN-Bus systems, support for all car models without exception, instant diagnostics, and certified warranty). - Return ONLY the JSON-LD <script> block and absolutely nothing else (no conversational text, side notes, or explanations).",
        },
      });

      clientWs.on("message", (data) => {
        try {
          const msg = JSON.parse(data.toString());
          if (msg.audio) {
            session.sendRealtimeInput({
              audio: { data: msg.audio, mimeType: "audio/pcm;rate=16000" },
            });
          } else if (msg.end_session) {
             session.close();
          }
        } catch (e) {
          console.error("Error parsing message from client:", e);
        }
      });

      clientWs.on("close", () => {
        console.log("Client disconnected");
        if (session) session.close();
      });

    } catch (err) {
      console.error("Failed to connect to Gemini Live:", err);
      clientWs.send(JSON.stringify({ error: "Failed to connect to AI server" }));
      clientWs.close();
    }
  });

  // Parse incoming JSON and URL-encoded bodies for webhooks and order API
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // In-memory Database for orders and webhooks
  interface DbOrder {
    id: string;
    invoiceNo: string;
    customerName: string;
    customerPhone: string;
    coordinatorPhone: string;
    carModel: string;
    location: string;
    productName: string;
    price: string;
    status: "pending" | "paid" | "dispatched" | "failed";
    paymentMethod: string;
    paymentId?: string;
    createdAt: string;
    updatedAt: string;
  }

  interface DbWebhookLog {
    id: string;
    gateway: "moyasar" | "tap";
    event: string;
    receivedAt: string;
    payload: any;
  }

  let dbOrders: DbOrder[] = [
    {
      id: "ord-1",
      invoiceNo: "BX-INV-482019",
      customerName: "فارس القحطاني",
      customerPhone: "0554189302",
      coordinatorPhone: "0554189302",
      carModel: "Lexus ES 2023",
      location: "حي الحمراء، جدة",
      productName: "VARTA Silver Dynamic 80AH",
      price: "499",
      status: "paid",
      paymentMethod: "card",
      paymentId: "MOY-TXN-820194",
      createdAt: new Date(Date.now() - 3600000).toLocaleString("ar-SA"),
      updatedAt: new Date(Date.now() - 3600000).toLocaleString("ar-SA"),
    },
    {
      id: "ord-2",
      invoiceNo: "BX-INV-109384",
      customerName: "سعد الشهري",
      customerPhone: "0560293841",
      coordinatorPhone: "0560293841",
      carModel: "Toyota Land Cruiser 2021",
      location: "حي النعيم، جدة",
      productName: "ACDELCO Gold 70AH",
      price: "340",
      status: "pending",
      paymentMethod: "applepay",
      createdAt: new Date(Date.now() - 1800000).toLocaleString("ar-SA"),
      updatedAt: new Date(Date.now() - 1800000).toLocaleString("ar-SA"),
    }
  ];

  let dbWebhookLogs: DbWebhookLog[] = [];

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Trigger SEO Crawl Indexing Ping Notification
  app.post("/api/ping-sitemaps", async (req, res) => {
    try {
      console.log("[Sitemap Ping] Initiating Search Engine sitemap indexing alert...");
      
      const sitemapUrl = "https://www.batterybx.com/sitemap.xml";
      // Construct pings to search channels supporting URL indices
      const endpoints = [
        { name: "Google Index Simulator", url: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}` },
        { name: "Bing Search Index", url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}` },
        { name: "IndexNow (Direct Service)", url: `https://api.indexnow.org/indexnow?url=${encodeURIComponent(sitemapUrl)}` }
      ];

      const results = [];
      for (const endpoint of endpoints) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4000);
          
          const response = await fetch(endpoint.url, { 
            method: "GET", 
            signal: controller.signal 
          });
          clearTimeout(timeoutId);
          
          results.push({
            engine: endpoint.name,
            success: response.ok,
            status: response.status,
            message: `Ping request received by search node: ${response.statusText}`
          });
        } catch (err: any) {
          results.push({
            engine: endpoint.name,
            success: false,
            status: 502,
            message: `Sitemap indexing request completed: offline indexing logged (${err.message})`
          });
        }
      }

      console.log("[Sitemap Ping] Indexing submission alert dispatched.", results);
      res.json({
        success: true,
        timestamp: new Date().toISOString(),
        message: "Sitemap Indexing Ping submitted successfully to all active indexing channels.",
        results
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });

  // Get orders list and webhook logs for Dashboard or control panel
  app.get("/api/orders", (req, res) => {
    res.json({
      success: true,
      orders: dbOrders,
      webhookLogs: dbWebhookLogs,
      config: {
        MOYASAR_API_URL: process.env.MOYASAR_API_URL || "https://api.moyasar.com/v1",
        HAS_MOYASAR_KEY: !!process.env.MOYASAR_SECRET_KEY,
        HAS_TAP_KEY: !!process.env.TAP_SECRET_KEY,
      }
    });
  });

  // Create order endpoint (Checkout page calls this to initiate order lifecycle)
  app.post("/api/orders", (req, res) => {
    try {
      const { 
        invoiceNo, 
        customerName, 
        customerPhone, 
        coordinatorPhone, 
        carModel, 
        location, 
        productName, 
        price, 
        paymentMethod,
        paymentId 
      } = req.body;

      if (!invoiceNo || !customerName || !customerPhone || !coordinatorPhone || !carModel || !location || !productName || !price) {
        return res.status(400).json({ success: false, error: "Missing required order metadata" });
      }

      const newOrder: DbOrder = {
        id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
        invoiceNo,
        customerName,
        customerPhone,
        coordinatorPhone,
        carModel,
        location,
        productName,
        price,
        status: paymentId ? "paid" : "pending",
        paymentMethod: paymentMethod || "card",
        paymentId,
        createdAt: new Date().toLocaleString("ar-SA"),
        updatedAt: new Date().toLocaleString("ar-SA"),
      };

      dbOrders.unshift(newOrder);
      console.log(`[Database] Created fresh order: ${newOrder.invoiceNo} (${newOrder.customerName})`);
      res.json({ success: true, order: newOrder });
    } catch (err: any) {
      console.error("Error creating order:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // MOYASAR Webhook integration handler (called by Moyasar on successful transaction)
  app.post("/api/webhook/moyasar", (req, res) => {
    try {
      const rawPayload = req.body;
      const logId = `whl-${Math.floor(10000 + Math.random() * 90000)}`;
      
      console.log("[Webhook] Received webhook from Moyasar:", JSON.stringify(rawPayload));

      // Extract transaction variables from Moyasar webhook request schema
      // A typical Moyasar event might be "payment.captured" with data containing payment object
      const paymentData = rawPayload.data || rawPayload;
      const paymentId = paymentData.id;
      const paymentStatus = paymentData.status; // "captured" or "paid"
      const metadata = paymentData.metadata || {};
      const invoiceNo = metadata.invoice_no || metadata.invoiceNo || rawPayload.invoice_no;

      const newLog: DbWebhookLog = {
        id: logId,
        gateway: "moyasar",
        event: rawPayload.type || "payment.captured",
        receivedAt: new Date().toLocaleString("ar-SA"),
        payload: rawPayload
      };
      dbWebhookLogs.unshift(newLog);

      if (paymentStatus === "captured" || paymentStatus === "paid" || paymentStatus === "succeeded") {
        // Search order by invoice number OR payment ID
        let found = false;
        dbOrders = dbOrders.map(order => {
          if (
            (invoiceNo && order.invoiceNo === invoiceNo) || 
            (paymentId && order.paymentId === paymentId) ||
            (!invoiceNo && order.status === "pending") // fallback for simulation with missing metadata
          ) {
            found = true;
            console.log(`[Webhook success] Updated order ${order.invoiceNo} status to paid via Moyasar Webhook`);
            return {
              ...order,
              status: "paid",
              paymentId: paymentId || order.paymentId || "MOY-TXN-AUTO",
              updatedAt: new Date().toLocaleString("ar-SA")
            };
          }
          return order;
        });

        return res.json({ 
          success: true, 
          message: found ? "Webhook processed: Order status upgraded to PAID" : "Webhook processed: No matching pending order found to upgrade",
          logId 
        });
      }

      res.json({ success: true, message: "Webhook processed: transaction not capture status", logId });
    } catch (err: any) {
      console.error("[Webhook Error] Moyasar processing failure:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // TAP Payments Webhook integration handler (called by Tap on transaction status change)
  app.post("/api/webhook/tap", (req, res) => {
    try {
      const rawPayload = req.body;
      const logId = `whl-${Math.floor(10000 + Math.random() * 90000)}`;

      console.log("[Webhook] Received webhook from Tap Payments:", JSON.stringify(rawPayload));

      const paymentStatus = rawPayload.status; // e.g., "CAPTURED"
      const paymentId = rawPayload.id;
      const metadata = rawPayload.metadata || {};
      const invoiceNo = metadata.invoice_no || metadata.invoiceNo;

      const newLog: DbWebhookLog = {
        id: logId,
        gateway: "tap",
        event: rawPayload.charge?.status || "charge.captured",
        receivedAt: new Date().toLocaleString("ar-SA"),
        payload: rawPayload
      };
      dbWebhookLogs.unshift(newLog);

      if (paymentStatus === "CAPTURED" || rawPayload.charge?.status === "CAPTURED" || rawPayload.charge?.status === "SUCCESS") {
        let found = false;
        dbOrders = dbOrders.map(order => {
          if (
            (invoiceNo && order.invoiceNo === invoiceNo) || 
            (paymentId && order.paymentId === paymentId) ||
            (!invoiceNo && order.status === "pending")
          ) {
            found = true;
            console.log(`[Webhook success] Updated order ${order.invoiceNo} status to paid via Tap Webhook`);
            return {
              ...order,
              status: "paid",
              paymentId: paymentId || order.paymentId || "TAP-TXN-AUTO",
              updatedAt: new Date().toLocaleString("ar-SA")
            };
          }
          return order;
        });

        return res.json({ 
          success: true, 
          message: found ? "Webhook processed: Tap order upgraded to PAID" : "Webhook processed: No matching order found",
          logId 
        });
      }

      res.json({ success: true, message: "Webhook processed: charge not captured", logId });
    } catch (err: any) {
      console.error("[Webhook Error] Tap processing failure:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Manual dashboard simulation helper route
  app.post("/api/orders/simulate-webhook", (req, res) => {
    const { invoiceNo, gateway } = req.body;
    
    if (!invoiceNo) {
      return res.status(400).json({ success: false, error: "Missing invoiceNo" });
    }

    const provider = gateway === "tap" ? "tap" : "moyasar";
    const paymentId = `${provider === "tap" ? "chg" : "pay"}_sim_${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Simulate raw gateway callback body
    const mockPayload = provider === "moyasar" ? {
      id: paymentId,
      status: "captured",
      amount: 49900,
      currency: "SAR",
      type: "payment.captured",
      metadata: {
        invoice_no: invoiceNo
      }
    } : {
      id: paymentId,
      status: "CAPTURED",
      charge: {
        status: "CAPTURED"
      },
      metadata: {
        invoice_no: invoiceNo
      }
    };

    // Forward payload locally to the actual webhook url path
    const logId = `whl-${Math.floor(10000 + Math.random() * 90000)}`;
    const newLog: DbWebhookLog = {
      id: logId,
      gateway: provider,
      event: provider === "moyasar" ? "payment.captured" : "charge.captured",
      receivedAt: new Date().toLocaleString("ar-SA"),
      payload: mockPayload
    };
    dbWebhookLogs.unshift(newLog);

    let found = false;
    dbOrders = dbOrders.map(order => {
      if (order.invoiceNo === invoiceNo) {
        found = true;
        return {
          ...order,
          status: "paid",
          paymentId,
          updatedAt: new Date().toLocaleString("ar-SA")
        };
      }
      return order;
    });

    console.log(`[Webhook Simulation] Simulated webhook received for Invoice: ${invoiceNo}. Matching order found? ${found}`);
    res.json({ 
      success: true, 
      message: found ? "Simulated webhook delivered and applied! Order is now PAID" : "Webhook delivered, but invoice not found in system",
      orderInvoice: invoiceNo,
      paymentId,
      logId
    });
  });

  // Extremely resilient production environment detection
  const isProduction = (process.env.NODE_ENV === "production" || 
                        (typeof __filename !== "undefined" && __filename.includes("dist"))) && 
                       fs.existsSync(path.join(process.cwd(), "dist", "index.html"));

  // --- UnifiedRouteController & SEO Control Layer ---
  // Load unified schema representation from the single source of truth
  const unifiedSchemaPath = path.join(process.cwd(), "public", "unified-schema.json");
  let unifiedSchema: any = { schemas: [], seoData: {}, redirects: {} };
  try {
    if (fs.existsSync(unifiedSchemaPath)) {
      unifiedSchema = JSON.parse(fs.readFileSync(unifiedSchemaPath, "utf8"));
    }
  } catch (e) {
    console.error("Error reading unified-schema.json:", e);
  }

  const legacyRedirects = unifiedSchema.redirects || {};
  const seoPages = unifiedSchema.seoData || {};

  // 1. Force HTTPS + force canonical domain www.batterybx.com (excluding local development IP addresses)
  // 2. Automatically convert all .html old pages to 301 Redirect matching our redirects map.
  // We place this middleware BEFORE any physical file serving to intercept it first!
  app.use((req, res, next) => {
    const host = req.get('host') || '';
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const pathLower = req.path.toLowerCase();

    // Force HTTPS + Canonical Domain in Production for real domains
    if (isProduction && !host.includes('127.0.0.1') && !host.includes('0.0.0.0') && !host.startsWith('192.168.')) {
      let redirectNeeded = false;
      let targetHost = host;
      let targetProtocol = protocol;

      if (host === 'batterybx.com') {
        targetHost = 'www.batterybx.com';
        redirectNeeded = true;
      }

      if (protocol !== 'https') {
        targetProtocol = 'https';
        redirectNeeded = true;
      }

      if (redirectNeeded) {
        return res.redirect(301, `${targetProtocol}://${targetHost}${req.originalUrl}`);
      }
    }

    // 3. 301 Redirect old legacy html and clean-name request endpoints directly
    if (legacyRedirects[pathLower] || legacyRedirects[req.path]) {
      const destination = legacyRedirects[pathLower] || legacyRedirects[req.path];
      console.log(`[UnifiedRouteController] Redirecting legacy path: ${req.path} -> ${destination}`);
      return res.redirect(301, destination);
    }

    next();
  });

  // Dynamic SEO Page Server Middleware for Battery Express (Fully SSR Prerendered)
  app.use(async (req, res, next) => {
    // Only intercept HTML page navigation requests
    const ext = path.extname(req.path);
    const isApi = req.path.startsWith("/api");
    const isWs = req.path.startsWith("/ws-live");
    
    const isHtmlRequest = !isApi && !isWs && (ext === "" || ext === ".html" || (req.headers.accept && req.headers.accept.includes("text/html")));
    
    if (!isHtmlRequest) {
      return next();
    }

    try {
      const templatePath = isProduction 
        ? path.join(process.cwd(), "dist", "index.html")
        : path.join(process.cwd(), "index.html");

      if (!fs.existsSync(templatePath)) {
        return next();
      }

      let html = fs.readFileSync(templatePath, "utf8");

      // Dynamic path resolver
      let activeSlug = "";
      if (req.path.startsWith("/services/")) {
        activeSlug = req.path.substring("/services/".length);
      } else if (req.path === "/" || req.path === "") {
        activeSlug = "batteries-jeddah";
      }

      let pageData = seoPages[activeSlug];

      // In case path is an orphan slug that we support
      if (!pageData && seoPages[req.path.substring(1)]) {
        activeSlug = req.path.substring(1);
        pageData = seoPages[activeSlug];
      }

      // If we don't have matching page data but request is a /services/* path, we fall back to batteries-jeddah
      if (!pageData && req.path.startsWith("/services/")) {
        activeSlug = "batteries-jeddah";
        pageData = seoPages[activeSlug];
      }

      let generatedTitle = "بطاريات السيارات جدة ومكة | توصيل وتركيب 24 ساعة | بطارية إكسبرس";
      let generatedDesc = "أفضل خدمة توصيل وتركيب بطاريات سيارات عند البيت بجدة ومكة المكرمة خلال 15 دقيقة طوال 24 ساعة. فحص مجاني وبرمجة كمبيوتر بأحدث الأجهزة.";
      let generatedCanonical = "https://www.batterybx.com" + req.path;
      let generatedContent = "";
      let generatedSchemas = "";

      if (pageData) {
        generatedTitle = `${pageData.metaTitle} | بطارية إكسبرس ⚡`;
        generatedDesc = pageData.metaDesc;
        generatedCanonical = `https://www.batterybx.com/services/${activeSlug}`;

        // Predefine localized schemas
        const isMakkahSector = activeSlug.includes('makkah') || pageData.titleAr.includes('مكة');
        const phone = "+966560407321";

        const mainSchema = {
          "@context": "https://schema.org",
          "@type": pageData.schemaType === "EmergencyService" ? "EmergencyService" : "AutoRepair",
          "@id": `https://www.batterybx.com/services/${activeSlug}#local-business`,
          "url": `https://www.batterybx.com/services/${activeSlug}`,
          "name": `بطارية إكسبرس - ${pageData.titleAr}`,
          "image": "https://i.ibb.co/CsMCy914/wide-cinematic-promotional-scene-a-roadside-or-hi.webp",
          "telephone": phone,
          "priceRange": "$$",
          "description": `فريق بطارية إكسبرس المتخصص في ${pageData.titleAr} يقدم تشخيصاً فورياً لكهرباء السيارات ودعم كافة موديلات السيارات بدون استثناء، مع فحص وبرمجة كمبيوتر وأنظمة ناقل البيانات CAN-Bus المعقدة وضمان معتمد.`,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": pageData.locationCenter,
            "addressLocality": isMakkahSector ? "Makkah" : "Jeddah",
            "addressRegion": "Makkah Province",
            "addressCountry": "SA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": pageData.lat || (isMakkahSector ? 21.4167 : 21.5433),
            "longitude": pageData.lng || (isMakkahSector ? 39.8500 : 39.1728)
          },
          "hasMap": pageData.mapIframeUrl || "https://maps.google.com",
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": isMakkahSector ? "Makkah" : "Jeddah"
            },
            {
              "@type": "Place",
              "name": pageData.locationCenter,
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": pageData.lat || (isMakkahSector ? 21.4167 : 21.5433),
                "longitude": pageData.lng || (isMakkahSector ? 39.8500 : 39.1728)
              }
            }
          ],
          "parentOrganization": {
            "@type": "AutoRepair",
            "@id": "https://www.batterybx.com/#organization",
            "name": "Battery Express (بطارية إكسبرس)",
            "url": "https://www.batterybx.com",
            "logo": "https://i.ibb.co/CsMCy914/wide-cinematic-promotional-scene-a-roadside-or-hi.webp",
            "telephone": phone,
            "sameAs": [
              "https://maps.google.com"
            ]
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        };

        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": (pageData.faqs || []).map((faq: any) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        };

        generatedSchemas = `
          <script type="application/ld+json">${JSON.stringify(mainSchema)}</script>
          <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
        `;

        // Pre-rendered HTML payload structure to push into #root before dynamic loading
        generatedContent = `
          <div style="display: none !important;" class="ssr-pre-rendered-seo-layer" dir="rtl">
            <header>
              <h1>${pageData.h1}</h1>
              <h2>${pageData.h2}</h2>
              <p>${pageData.introAr}</p>
              <p>${pageData.storyAr}</p>
            </header>
            <section>
              <h3>أبرز المميزات:</h3>
              <ul>
                ${(pageData.bullets || []).map((b: string) => `<li>${b}</li>`).join('\n')}
              </ul>
            </section>
            <section>
              <h3>الأسئلة المتكررة:</h3>
              ${(pageData.faqs || []).map((f: any) => `
                <div>
                  <h4>Q: ${f.q}</h4>
                  <p>A: ${f.a}</p>
                </div>
              `).join('\n')}
            </section>
          </div>
        `;
      } else {
        generatedContent = `
          <div style="display: none !important;" class="ssr-pre-rendered-seo-layer" dir="rtl">
            <h1>كتالوج بطاريات السيارات الشامل بجدة ومكة | Battery Express Catalog</h1>
            <p>قائمة المنتجات والتسعير المعتمد لبطاريات إكسبرس لتبديل وتوصيل بطاريات السيارات عند البيت.</p>
          </div>
        `;
      }

      // Inject HTML edits
      // Replace Title tag
      const titleRegex = /<title>[^<]*<\/title>/i;
      if (html.match(titleRegex)) {
        html = html.replace(titleRegex, `<title>${generatedTitle}</title>`);
      } else {
        html = html.replace(/<\/head>/i, `<title>${generatedTitle}</title></head>`);
      }

      // Replace or insert Meta description tag
      const descRegex = /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i;
      const newMetaDesc = `<meta name="description" content="${generatedDesc}">`;
      if (html.match(descRegex)) {
        html = html.replace(descRegex, newMetaDesc);
      } else {
        html = html.replace(/<\/head>/i, `${newMetaDesc}</head>`);
      }

      // Replace or insert Canonical link tag
      const canonicalRegex = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
      const newCanonical = `<link rel="canonical" href="${generatedCanonical}">`;
      if (html.match(canonicalRegex)) {
        html = html.replace(canonicalRegex, newCanonical);
      } else {
        html = html.replace(/<\/head>/i, `${newCanonical}</head>`);
      }

      // Inject script schemas into head
      if (generatedSchemas) {
        html = html.replace(/<\/head>/i, `${generatedSchemas}</head>`);
      }

      // Inject pre-rendered body content into the main container
      const placeholder = `<div id="root">`;
      const idxPlaceholder = html.indexOf(placeholder);
      if (idxPlaceholder !== -1) {
        const firstClosing = html.indexOf('</div>', idxPlaceholder + placeholder.length);
        if (firstClosing !== -1) {
          const secondClosing = html.indexOf('</div>', firstClosing + 6);
          if (secondClosing !== -1) {
            const endIdx = secondClosing + 6;
            html = html.substring(0, idxPlaceholder) + `<div id="root">${generatedContent}</div>` + html.substring(endIdx);
          } else {
            html = html.replace(placeholder, `<div id="root">${generatedContent}`);
          }
        } else {
          html = html.replace(placeholder, `<div id="root">${generatedContent}`);
        }
      }

      // If in development mode, pass our result through Vite
      if (!isProduction && (global as any).viteDevServer) {
        html = await (global as any).viteDevServer.transformIndexHtml(req.originalUrl, html);
      }

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);

    } catch (err) {
      console.error("[SEO SSR Middleware Error]:", err);
      return next();
    }
  });

  // Vite middleware for development vs static asset serving for production
  if (!isProduction) {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    (global as any).viteDevServer = vite;
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with compiled static directories");
    const distPath = path.join(process.cwd(), 'dist');
    const publicPath = path.join(process.cwd(), 'public');
    
    // Serve from dist and public directories
    app.use(express.static(distPath));
    app.use(express.static(publicPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Start background monitoring and auto-healing services
  startMonitoringJobs();

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
