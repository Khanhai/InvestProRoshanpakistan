import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/sendPayment", async (req,res)=>{
    const {name,wallet,amount} = req.body;

    try {
        // ⚠️ Use your Secret Key here safely
        const secretKey = "sk_live_srFJ1lJyi2ucmXWc79FKrxToXAxSKW7UcCmksriREaXG7MioADpY2tX...";
        
        // Example API call to your payment gateway
        const response = await fetch("https://api.gateway.com/send", {
            method:"POST",
            headers:{
                "Authorization":"Bearer "+secretKey,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                amount,
                wallet_number: wallet,
                note: `Payment to ${name}`
            })
        });

        const data = await response.json();
        if(data.status === "success"){
            res.json({ success:true });
        } else {
            res.json({ success:false, error:data.message });
        }
    } catch(err){
        res.json({ success:false, error: err.message });
    }
});

app.listen(3000,()=>console.log("Server running on port 3000"));
