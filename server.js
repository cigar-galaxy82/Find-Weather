import express from "express";
import { SuperfaceClient } from "@superfaceai/one-sdk";
const app = express();

const sdk = new SuperfaceClient();

async function weather(city) {
  // Load the profile
  const profile = await sdk.getProfile("weather/current-city@1.0.3");

  // Use the profile
  const result = await profile.getUseCase("GetCurrentWeatherInCity").perform(
    {
			//
      city: city,
      units: "C"
    },
    {
      provider: "openweathermap",
      security: {
        apikey: {
          apikey: "9a7c7994ccda87a3f8bb2767d5ca48db"
        }
      }
    }
  );

  // Handle the result
  try {
    const data = result.unwrap();
    return data;
  } catch (error) {
    console.error(error);
  }
}

app.get("/", async (req, res) => {
  let city = "Pune"
  res.send(await weather(city));
});

app.listen(3000, () => {
  console.log("SERVER RUNNIHG AT PORT 3000");
});