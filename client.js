import "https://deno.land/std@0.178.0/dotenv/load.ts";

console.log(Deno.env.get("GREETING"));
const freqtrade_token = Deno.env.get("FREQTRADE__PRODUCER");
const ws = new WebSocket(`ws://127.0.0.1:8080/api/v1/message/ws?token=${freqtrade_token}`);
const msg = JSON.stringify({
    "type": "subscribe",
    "data": ["whitelist", "analyzed_df"],
  });

ws.addEventListener("open", (e) => {
    console.dir(e);
    ws.send(msg);
});

ws.addEventListener("message", (e) => console.log("message!", e.data));

ws.addEventListener("close", (e) => console.log("close", e));

ws.addEventListener("error", (e) => console.log("error:", e));