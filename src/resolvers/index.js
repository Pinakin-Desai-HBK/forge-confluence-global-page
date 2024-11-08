import Resolver from "@forge/resolver";
import { storage } from "@forge/api";

const resolver = new Resolver();

resolver.define("getText", (req) => {
  console.log(req);
  return "Hello, world!";
});

resolver.define("getData", async () => {
  const data = await storage.get("data");
  if (!data) {
    const newData = {
      teamHealth: {
        Delivering_Value: 0,
        Easy_To_Release: 0,
        Fun: 0,
        Health_Of_Codebase: 0,
        Learning: 0,
        Mission: 0,
        Pawns_Or_Players: 0,
        Speed: 0,
        Way_Of_Working: 0,
        Support: 0,
        Teamwork: 0
      }
    };
    await storage.set("data", newData);
    return newData;
  } else {
    return data;
  }
});

resolver.define("setData", async ({ payload }) => {
  await storage.set("data", payload);
});

export const handler = resolver.getDefinitions();
