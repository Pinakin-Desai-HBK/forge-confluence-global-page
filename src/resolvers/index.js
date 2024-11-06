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

resolver.define("setData", async () => {
  const newData = {
    teamHealth: {
      Delivering_Value: 5,
      Easy_To_Release: 2,
      Fun: 1,
      Health_Of_Codebase: 4,
      Learning: 3,
      Mission: 2,
      Pawns_Or_Players: 3,
      Speed: 5,
      Way_Of_Working: 4,
      Support: 1,
      Teamwork: 2
    }
  };
  await storage.set("data", newData);
});

export const handler = resolver.getDefinitions();
