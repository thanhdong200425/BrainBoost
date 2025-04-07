import axios from "axios";
import fs from "fs";

const getTunnelUrl = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:4040/api/tunnels");
        const resultUrl = res.data.tunnels[0].public_url;

        const configInfo = `export const BRAIN_BOOST_SERVER_URL = "${resultUrl}";\n`;
        fs.writeFileSync("./config/remote-server.js", configInfo, { flag: "w" });
        console.log("Tunnel URL updated successfully.");
    } catch (error) {
        console.error("Error fetching tunnel URL:", error);
        return null;
    }
};

getTunnelUrl();
