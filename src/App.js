import { useState } from "react";
import "./App.css";
import { Meteo } from "./components/Meteo";
import { useEffect } from "react";
import mqtt from "mqtt";

function App() {
  const [client, setClient] = useState(null);
  const [connectionStatus, setConnectStatus] = useState("");
  const [mqttData, setMqttData] = useState();
  const mqttConnect = (mqttOption) => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect("ws://test.mosquitto.org", mqttOption));
  };

  useEffect(() => {
    mqttConnect({
      host: "test.mosquitto.org", //"195.161.68.19",
      port: 8080,
      protocol: "ws",
      clientId: "max1" + new Date(),
    });
  }, []);

  useEffect(() => {
    // if (connectStatus !== "Connected") {
    //   mqttConnect({
    //     host: "192.168.1.96",
    //     port: 8888,
    //     protocol: "ws",
    //     clientId: "asdg1",
    //   });
    // }
    if (client) {
      console.log(client);
      client.on("connect", () => {
        setConnectStatus("Connected");
        mqttSub({ topic: "weather-station", qos: 1 });

        console.log("mqtt connect");
        // const { topic, qos, payload } = context;
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        // client.end();
      });
      client.on("reconnect", () => {
        console.log("mqtt reconnect");
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        console.log("mqtt message", payload);
        // setPayload(payload);
        console.log("payload", payload);
        setMqttData(message.toString());
        message.toString().split(" ");
        const paramValue = message.toString().split(" ");
      });
    }
  }, [client]);

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        console.log("mqtt subscribe at", subscription);
        // setIsSub(true);
      });
    }
  };

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  return (
    <div>
      {connectionStatus}
      <Meteo mqttData={mqttData} />
    </div>
  );
}

export default App;
